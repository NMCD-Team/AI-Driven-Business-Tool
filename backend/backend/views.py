import os
import openai
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404 # For 404 handling
from assessment.models import Questionnaire, BusinessAssessment
from .serializers import AnalyzeSerializer 
from rest_framework.decorators import api_view
from assessment.models import Report
from assessment.models import UserProfile 
from django.contrib.auth.models import User # Import Django's User model
from openai import OpenAI
from .serializers import (
    QuestionnaireSerializer,
    ReportSerializer,
    BusinessAssessmentSerializer,
    UserProfileSerializer
)

# Create a Business Assessment
class BusinessAssessmentCreateView(generics.CreateAPIView):
    queryset = BusinessAssessment.objects.all()
    serializer_class = BusinessAssessmentSerializer

# Submit a Questionnaire
class QuestionnaireCreateView(generics.CreateAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

# List Reports by User ID
class UserReportsView(generics.ListAPIView):
    serializer_class = BusinessAssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id'] 
        user = get_object_or_404(User, pk=user_id) 
        if user != self.request.user:
            self.permission_denied(self.request) 

        return BusinessAssessment.objects.filter(user=user)

# Create or Update User Profile
class UserProfileUpdateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


@api_view(['POST'])
def analyze(request):
    serializer = AnalyzeSerializer(data=request.data.get('data'))
    if serializer.is_valid():
        assessment_id = serializer.validated_data['assessment_id']
        focus_areas = serializer.validated_data.get('focus_areas', [])
        description = serializer.validated_data['description']

        try:
            assessment = BusinessAssessment.objects.get(pk=assessment_id)

        except BusinessAssessment.DoesNotExist:
            return Response({"error": "Assessment not found"}, status=status.HTTP_404_NOT_FOUND)

        description = serializer.validated_data['description']
        _ = description
       
        prompt = f"Analyze the market position and growth potential for this assessment:\n\n{assessment.description}\n\nFocus on these areas: {', '.join(focus_areas) if focus_areas else 'General Analysis'}"


        try:
            client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))  # Get the key from environment variables

            prompt = f"Analyze the following business information:\n{assessment.business_description}\n\nConsider these additional details:\n{assessment.additional_info}\n\nAnswer these specific questions:\n{assessment.specific_questions}"
            print(f"Prompt being sent to OpenAI: {prompt}")

            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",  # Or gpt-4 if you have access
                messages=[
                    {"role": "system", "content": "You are a helpful business analyst."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=500,
                temperature=0.7,
            )

            analysis_results = completion.choices[0].message.content.strip()
            report = Report.objects.create(
                assessment=assessment,
                results=analysis_results
            )

            return Response({"analysis": analysis_results, "report_id": report.id}, status=status.HTTP_200_OK) # Return report ID

        except openai.error.OpenAIError as e: 
            return Response({"error": f"OpenAI API Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:  #
            return Response({"error": f"An unexpected error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
