from django.contrib.auth.models import User  
import openai
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404 
from assessment.models import Questionnaire, BusinessAssessment
from .serializers import AnalyzeSerializer 
from rest_framework.decorators import api_view
from assessment.models import Report
from assessment.models import UserProfile 
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import (
    QuestionnaireSerializer,
    BusinessAssessmentSerializer,
    UserProfileSerializer
)

client = openai.OpenAI()
class BusinessAssessmentCreateView(generics.CreateAPIView):
    queryset = BusinessAssessment.objects.all()
    serializer_class = BusinessAssessmentSerializer

class QuestionnaireCreateView(generics.CreateAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

class UserReportsView(generics.ListAPIView):
    serializer_class = BusinessAssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id'] 
        user = get_object_or_404(User, pk=user_id) 
        
        if user != self.request.user:
            self.permission_denied(self.request) 

        return BusinessAssessment.objects.filter(user=user)

class UserProfileUpdateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


@api_view(['POST'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated])
def analyze(request):

    print("Auth header:", request.headers.get('Authorization'))
    
    from rest_framework_simplejwt.authentication import JWTAuthentication
    jwt_auth = JWTAuthentication()
    
    try:
        validated_token = jwt_auth.get_validated_token(request.headers.get('Authorization').split(' ')[1])
        user = jwt_auth.get_user(validated_token)
        print("Authenticated user:", user)
    except Exception as e:
        print("JWT Authentication error:", str(e))
        return Response({"error": "Authentication failed: " + str(e)}, status=401)
    
    serializer = AnalyzeSerializer(data=request.data.get('data'))
    
    if serializer.is_valid():
        assessment_id = serializer.validated_data['assessment_id']
        
        focus_areas = serializer.validated_data.get('focus_areas', [])
        
        try:
            assessment = BusinessAssessment.objects.get(pk=assessment_id)
        except BusinessAssessment.DoesNotExist:
            return Response({"error": "Assessment not found"}, status=status.HTTP_404_NOT_FOUND)

        prompt = f"Analyze the market position and growth potential for this assessment:\n\n{assessment.description}\n\nFocus on these areas: {', '.join(focus_areas) if focus_areas else 'General Analysis'}"

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",  
                messages=[
                    {"role": "system", "content": "You are a helpful business analyst."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,  
                temperature=0.7,  
            )

            analysis_results = response.choices[0].message.content.strip()

            return Response({"analysis": analysis_results}, status=status.HTTP_200_OK)

        except openai.OpenAIError as e:
            return Response({"error": f"OpenAI API Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": f"An unexpected error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)