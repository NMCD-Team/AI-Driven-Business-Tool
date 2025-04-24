import os
from django.shortcuts import get_object_or_404
import openai
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status  # Correct import
from .models import BusinessAssessment
from .serializers import BusinessAssessmentSerializer
from openai import OpenAI
from .utils import create_narrative_text


@api_view(['GET']) 
def test_connection(request):
    return Response({"message": "Connection successful!"})

@api_view(['POST'])
def analyze(request):
    try:
        data = request.data
        assessment_id = data.get('id')
        if assessment_id:  
            try:
                assessment = BusinessAssessment.objects.get(id=assessment_id)
                for field_name, value in data.items():
                    if field_name != 'id' and hasattr(assessment, field_name):
                        setattr(assessment, field_name, value)
                assessment.save()
                created = False
            except BusinessAssessment.DoesNotExist:
                return Response({"error": "Assessment not found"}, status=status.HTTP_404_NOT_FOUND)
        else:  
            data_copy = data.copy()  # Create a copy to avoid modifying the original request data
            if 'businessDescription' in data_copy:  # Check if the camelCase key exists
                data_copy['business_description'] = data_copy.pop('businessDescription') # Convert to snake_case
            assessment = BusinessAssessment.objects.create(**data_copy)  # Use the modified data
            created = True

            openai.api_key = os.environ.get("OPENAI_API_KEY") 
            client = OpenAI()
            business_text = create_narrative_text(data)

            prompt = f"""
            Analyze the following business information:

            {business_text}

            Using concrete estimates and action-oriented language, provide your response under these exact headings:

            Market Position:
            -Provide a competitor overview and your best estimate of market share (e.g., “~12% of regional off-grid solar market”).
            - Call out any missing data and suggest how to fill it.

            Growth Potential:
            - List 2–3 opportunities with numeric clues (e.g., “inbound inquiries +30% YoY”).
            - List 2–3 risks with timeframes or probabilities (e.g., “supply delays up to 8 weeks”).
            - Give 1–2 growth indicators.

            Operational Insights:
            - Recommend 2–3 process improvements with target reductions (e.g., “reduce supply-chain delays by 20%”).
            - Identify 1–2 resource gaps.
            - Suggest 1 efficiency metric to track.

            Strategic Recommendations:
            - Give 5 concrete steps, each starting with a verb, each tagged “Priority: High/Medium/Low”.
            """



            print("Prompt being sent to OpenAI:", prompt)

            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",  
                messages=[
                    {"role": "system", "content": "You are a helpful business analyst."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=500,
                temperature=0.7,
            )
            print("GPT raw response:\n", completion)

            analysis_results = completion.choices[0].message.content.strip()
            assessment.analysis_results = analysis_results
            assessment.save()

        serializer = BusinessAssessmentSerializer(assessment) 
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    except Exception as e:
        print(f"Error in analyze view: {e}")  
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)