# AI_Business_Tool/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Questionnaire, Report

class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['id', 'user', 'submitted_at']


class ReportSerializer(serializers.ModelSerializer):
    questionnaire = QuestionnaireSerializer(read_only=True)

    class Meta:
        model = Report
        fields = ['id', 'user', 'questionnaire', 'analysis', 'product_suggestions', 'generated_at']
