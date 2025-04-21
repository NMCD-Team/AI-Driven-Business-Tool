# assessment/api.py
import os
from django.shortcuts import get_object_or_404
import openai
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status  # Correct import
from .models import BusinessAssessment
from .serializers import BusinessAssessmentSerializer


@api_view(['GET'])  # Use GET for testing
def test_connection(request):
    return Response({"message": "Connection successful!"})

@api_view(['POST'])
def analyze(request):
    try:
        data = request.data
        assessment_id = data.get('id')
        if assessment_id:  # If 'id' is provided, attempt update
            try:
                assessment = BusinessAssessment.objects.get(id=assessment_id)
                for field_name, value in data.items():
                    if field_name != 'id' and hasattr(assessment, field_name):
                        setattr(assessment, field_name, value)
                assessment.save()
                created = False
            except BusinessAssessment.DoesNotExist:
                return Response({"error": "Assessment not found"}, status=status.HTTP_404_NOT_FOUND)
        else:  # If no 'id', create new
            data_copy = data.copy()  # Create a copy to avoid modifying the original request data
            if 'businessDescription' in data_copy:  # Check if the camelCase key exists
                data_copy['business_description'] = data_copy.pop('businessDescription') # Convert to snake_case
            assessment = BusinessAssessment.objects.create(**data_copy)  # Use the modified data
            created = True

        openai.api_key = os.environ.get("OPENAI_API_KEY")
        prompt = f"Analyze the following business information:\n{assessment.business_description}\n\nConsider these additional details:\n{assessment.additional_info}\n\nAnswer these specific questions:\n{assessment.specific_questions}"
        print(f"Prompt being sent to OpenAI: {prompt}") # Crucial debugging step

        response = openai.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.7,
        )

        analysis_results = response.choices[0].message['content'].strip() # Access content correctly
        assessment.analysis_results = analysis_results
        assessment.save()

        analysis_results = response.choices[0].message.content.strip()

        # Update the assessment with the analysis results
        assessment.analysis_results = analysis_results
        assessment.save()

        serializer = BusinessAssessmentSerializer(assessment)  # Serialize the updated assessment
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    except Exception as e:
        print(f"Error in analyze view: {e}")  # Print the error to the console for debugging
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)