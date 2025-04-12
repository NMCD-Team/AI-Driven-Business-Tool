from rest_framework import serializers
from .models import BusinessAssessment

class BusinessAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessAssessment
        fields = '__all__'