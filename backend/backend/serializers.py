from rest_framework import serializers
from django.contrib.auth.models import User
from assessment.models import (
    UserProfile,
    Questionnaire,
    Report,
    BusinessAssessment
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'name', 'email', 'phone_number']

class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['id', 'user', 'submitted_at']

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            'id',
            'user',
            'questionnaire',
            'analysis',
            'product_suggestions',
            'growth_potential',
            'operation_insight',
            'strategic_recommendation',
            'generated_at'
        ]

class BusinessAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessAssessment
        fields = [
            'id',
            'email',
            'full_name',
            'company_name',
            'industry_niche',
            'years_in_business',
            'number_of_employees',
            'annual_revenue',
            'geographic_locations'
        ]

class AnalyzeSerializer(serializers.Serializer):
    assessment_id = serializers.IntegerField(required=True) 
    focus_areas = serializers.ListField(child=serializers.CharField())
    description = serializers.CharField(allow_blank=True)
    num_suggestions = serializers.IntegerField()
