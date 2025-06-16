from django.core.mail import EmailMessage
import os
import json
import logging
import re
from django.http import JsonResponse
import openai
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from openai import OpenAI
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView 
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework_simplejwt.authentication import JWTAuthentication 
from .models import BusinessAssessment, Report, Questionnaire, UserProfile
from .serializers import (
    BusinessAssessmentSerializer,
    QuestionnaireSerializer,
    UserSerializer,
    ReportSerializer
)
from .utils import create_narrative_text 

openai.api_key = settings.OPENAI_API_KEY


logger = logging.getLogger(__name__)

class AnalyzeView(APIView):
    """
    API endpoint for performing business analysis with OpenAI.
    Requires JWT authentication.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
        
    def post(self, request, *args, **kwargs):
        print("Auth header:", request.META.get('HTTP_AUTHORIZATION'))
        print("User:", request.user)
        logger.info(f"Request received from user: {request.user.username if request.user else 'Anonymous'}")
        logger.info(f"Auth header: {request.headers.get('Authorization', 'No Auth header')[:20]}...")
        
        try:
            data = request.data
            user = request.user
            
            # Log user info for debugging
            logger.info(f"Processing request for authenticated user ID: {user.id}")
            
            # --- Data Preparation and Assessment Handling ---
            field_mapping = {
                'businessName': 'business_name',
                'industry': 'industry',
                'businessDescription': 'business_description',
                'targetAudience': 'target_audience',
                'strengths': 'strengths',
                'weaknesses': 'weaknesses',
                'opportunities': 'opportunities',
                'threats': 'threats',
                'revenueStreams': 'revenue_streams',
                'majorExpenses': 'major_expenses',
                'fundingNeeds': 'funding_needs',
                'teamSize': 'team_size',
                'keyPersonnel': 'key_personnel',
                'email': 'email',  
                'full_name': 'full_name',  
                'company_name': 'company_name',  
            }
            
            model_data = {}
            unmapped_data_for_narrative = data.copy()

            for js_key, django_key in field_mapping.items():
                if js_key in data:
                    model_data[django_key] = data[js_key]

            model_data['user'] = user

            business_description = model_data.get('business_description', '')

            if 'email' not in model_data:
                model_data['email'] = user.email if hasattr(user, 'email') and user.email else 'no-email@example.com'
            
            if 'full_name' not in model_data:
                model_data['full_name'] = user.get_full_name() if hasattr(user, 'get_full_name') else 'User'
            
            if 'company_name' not in model_data:
                model_data['company_name'] = data.get('company_name', 'Unknown Company')

            assessment_id = data.get('id')
            if assessment_id:
                logger.warning(f"Received assessment_id {assessment_id}, but this endpoint primarily handles creation.")
                assessment = BusinessAssessment.objects.create(**model_data)
            else:
                assessment = BusinessAssessment.objects.create(**model_data)

            # --- OpenAI Analysis ---
            openai_api_key = settings.OPENAI_API_KEY
            
            if not openai_api_key:
                logger.error("OpenAI API key missing in environment variables")
                return Response({"error": "OpenAI API key configuration error."}, status=status.HTTP_400_BAD_REQUEST)
            
            client = OpenAI(api_key=openai_api_key)
            business_text = create_narrative_text(request.data)

            prompt = f"""
            Analyze the following business information:

            {business_text}

            Using concrete estimates and action-oriented language, provide your response under these exact headings:

            Market Position:
            - Provide a competitor overview and your best estimate of market share (e.g., "~12% of regional off-grid solar market").
            - Call out any missing data and suggest how to fill it.

            Growth Potential:
            - List 2–3 opportunities with numeric clues (e.g., "inbound inquiries +30% YoY").
            - List 2–3 risks with timeframes or probabilities (e.g., "supply delays up to 8 weeks").
            - Give 1–2 growth indicators.

            Operational Insights:
            - Recommend 2–3 process improvements with target reductions (e.g., "reduce supply-chain delays by 20%").
            - Identify 1–2 resource gaps.
            - Suggest 1 efficiency metric to track.

            Strategic Recommendations:
            - Give 5 concrete steps, each starting with a verb, each tagged "Priority: High/Medium/Low".
            """

            logger.info(f"Sending prompt to OpenAI for assessment {assessment.id}...")

            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful business analyst."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=800,
                temperature=0.7,
            )

            analysis_results = completion.choices[0].message.content.strip()
            if not analysis_results:
                logger.warning(f"OpenAI returned empty content for assessment {assessment.id}")
                analysis_results = "[Analysis generation failed or returned empty]"


            if hasattr(assessment, 'analysis_results'):
                assessment.analysis_results = analysis_results
                assessment.save()
            else:
                logger.warning("BusinessAssessment model does not have 'analysis_results' field")

            # --- Report Creation ---
            report = Report.objects.create(
                user=user,  
                business_description=business_description,
                assessment=assessment,
                content=analysis_results,
            )

            logger.info(f"Report {report.id} created for Assessment {assessment.id} by user {user.id}")

            try:
                email_address = assessment.email or user.email
                
                if email_address:
                    frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:3000')
                    report_url = f"{frontend_url}/reports/{report.id}"
                    
                    business_name = assessment.company_name
                    
                    html_message = render_to_string('email/report_ready.html', {
                        'user_name': assessment.full_name or user.get_full_name() or user.username,
                        'report_id': report.id,
                        'report_url': report_url,
                        'business_name': business_name
                    })
                    plain_message = strip_tags(html_message)
                    
                    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@example.com')
                    
                    send_mail(
                        subject='Your Business Analysis Report is Ready',
                        message=plain_message,
                        from_email=from_email,
                        recipient_list=[email_address],
                        html_message=html_message,
                        fail_silently=False,
                    )
                    
                    logger.info(f"Notification email sent to: {email_address} for report {report.id}")
                else:
                    logger.warning("No email address available for report notification")
                    
            except Exception as email_error:
                logger.error(f"Failed to send email notification: {str(email_error)}")

            return Response({
                "message": "Analysis complete and report created.",
                "assessment_id": assessment.id,
                "report_id": report.id,
                "analysis_results": analysis_results,
            }, status=status.HTTP_201_CREATED)

        except openai.APIError as e:
            logger.error(f"OpenAI API Error during analysis: {e}", exc_info=True)
            return Response({"error": f"OpenAI Service Error: {str(e)}"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except ValueError as e:
            logger.error(f"Configuration or Value Error during analysis: {e}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception(f"Unexpected error in analyze: {e}")
            return Response({"error": f"An internal server error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ReportDetailView(APIView):
    """
    API endpoint for retrieving report details.
    Requires JWT authentication.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, report_id):
        """
        Retrieves the content of a specific report by its ID, ensuring user owns it.
        """
        try:
            report = get_object_or_404(Report, id=report_id, user=request.user)
            serializer = ReportSerializer(report)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Report.DoesNotExist:
            return Response({"error": "Report not found or access denied"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error fetching report {report_id} for user {request.user.id}: {e}", exc_info=True)
            return Response({"error": "An internal server error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class QuestionnaireCreateView(generics.CreateAPIView):
    """ API endpoint for creating Questionnaires. """
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserProfileUpdateView(generics.RetrieveUpdateAPIView): 
    """ API endpoint for retrieving and updating the User's Profile. """
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer 
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        if created:
            logger.info(f"Created UserProfile for user {self.request.user.id}")
        return profile