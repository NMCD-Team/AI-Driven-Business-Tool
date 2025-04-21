from rest_framework import serializers
from .models import BusinessAssessment, Questionnaire
from django.contrib.auth.models import User

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessAssessment
        fields = '__all__'

class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

class AnalyzeSerializer(serializers.Serializer):
    assessment_id = serializers.IntegerField(required=True)
    # Removed 'description' - get it from the Assessment instance
    focus_areas = serializers.ListField(child=serializers.CharField(), required=False, default=[]) # Make it optional
    num_suggestions = serializers.IntegerField(required=False, default=5)

class BusinessAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessAssessment
        fields = '__all__'