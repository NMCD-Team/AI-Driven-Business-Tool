from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Questionnaire, Report, BusinessAssessment, UserProfile
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
    serializer_class = ReportSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Report.objects.filter(user__id=user_id)

# Create or Update User Profile
class UserProfileUpdateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
