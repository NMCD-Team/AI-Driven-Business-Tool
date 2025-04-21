from huggingface_hub import User
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
        user_id = self.kwargs['user_id'] # Get user_id from URL
        # Option 1: Return 404 if user doesn't exist (safer)
        user = get_object_or_404(User, pk=user_id) # Assuming you have User model imported

        # Option 2: Return 403 if user is not the logged-in user (more secure)
        if user != self.request.user:
            self.permission_denied(self.request) # Raise 403 Forbidden

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
        focus_areas = serializer.validated_data.get('focus_areas', [])  # Handle missing focus_areas
        description = serializer.validated_data['description']

        try:
            assessment = BusinessAssessment.objects.get(pk=assessment_id)

        except BusinessAssessment.DoesNotExist:
            return Response({"error": "Assessment not found"}, status=status.HTTP_404_NOT_FOUND)

        description = serializer.validated_data['description']
        _ = description
        # Construct the prompt for OpenAI (improved)
        prompt = f"Analyze the market position and growth potential for this assessment:\n\n{assessment.description}\n\nFocus on these areas: {', '.join(focus_areas) if focus_areas else 'General Analysis'}"


        try:
            response = openai.completions.create(
                model="gpt-3.5-turbo",  # Or a suitable model like "gpt-4"
                messages=[
                    {"role": "system", "content": "You are a helpful business analyst."},  # Optional
                    {"role": "user", "content": prompt}  # Your prompt goes here
                ],
                max_tokens=500,  # Adjust as needed
                n=1,
                stop=None,
                temperature=0.7,  # Adjust as needed
            )

            analysis_results = response.choices[0].message.content.strip()

            return Response({"analysis": analysis_results}, status=status.HTTP_200_OK)

        except openai.error.OpenAIError as e: # Handle OpenAI specific errors
            return Response({"error": f"OpenAI API Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:  # Catch other exceptions
            return Response({"error": f"An unexpected error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)