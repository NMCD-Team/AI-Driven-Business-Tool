# AI_Business_Tool/views.py

from rest_framework import generics
from .models import Questionnaire, Report
from .serializers import QuestionnaireSerializer, ReportSerializer
from django.contrib.auth.models import User

# Create a questionnaire
class QuestionnaireCreateView(generics.CreateAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

# List all reports for a user
class ReportListView(generics.ListAPIView):
    serializer_class = ReportSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Report.objects.filter(user__id=user_id)


