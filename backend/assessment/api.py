import os
import logging
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from openai import OpenAI
from .models import BusinessAssessment
from .serializers import BusinessAssessmentSerializer
from .utils import create_narrative_text

# Configure logging
logger = logging.getLogger(__name__)

# Initialize OpenAI client
def get_openai_client():
    """Initialize and return OpenAI client."""
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set")
    return OpenAI(api_key=api_key)

@api_view(['GET']) 
def test_connection(request):
    """Test endpoint to verify API connectivity."""
    return Response({"message": "Connection successful!"})

@api_view(['POST'])
def analyze(request):
    """
    Analyze business assessment data using OpenAI.
    Creates new assessment or updates existing one.
    """
    try:
        data = request.data
        assessment_id = data.get('id')
        
        # Handle existing assessment update
        if assessment_id:
            assessment = _update_existing_assessment(assessment_id, data)
            created = False
        else:
            # Create new assessment
            assessment = _create_new_assessment(data)
            created = True
            
            # Generate AI analysis for new assessments
            analysis_results = _generate_ai_analysis(data)
            assessment.analysis_results = analysis_results
            assessment.save()
        
        # Serialize and return response
        serializer = BusinessAssessmentSerializer(assessment)
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(serializer.data, status=status_code)
    
    except BusinessAssessment.DoesNotExist:
        logger.error(f"Assessment with id {assessment_id} not found")
        return Response(
            {"error": "Assessment not found"}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except ValueError as e:
        logger.error(f"Configuration error: {e}")
        return Response(
            {"error": "Configuration error. Please check server settings."}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except Exception as e:
        logger.error(f"Unexpected error in analyze view: {e}", exc_info=True)
        return Response(
            {"error": "An unexpected error occurred. Please try again later."}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

def _update_existing_assessment(assessment_id, data):
    """Update an existing assessment with new data."""
    assessment = get_object_or_404(BusinessAssessment, id=assessment_id)
    
    # Update fields dynamically
    for field_name, value in data.items():
        if field_name != 'id' and hasattr(assessment, field_name):
            setattr(assessment, field_name, value)
    
    assessment.save()
    return assessment

def _create_new_assessment(data):
    """Create a new assessment from request data."""
    # Prepare data for creation
    prepared_data = _prepare_assessment_data(data)
    return BusinessAssessment.objects.create(**prepared_data)

def _prepare_assessment_data(data):
    """Convert camelCase fields to snake_case for model compatibility."""
    data_copy = data.copy()
    
    # Map of camelCase to snake_case conversions
    field_mappings = {
        'businessDescription': 'business_description',
        # Add more field mappings as needed
    }
    
    for camel_case, snake_case in field_mappings.items():
        if camel_case in data_copy:
            data_copy[snake_case] = data_copy.pop(camel_case)
    
    return data_copy

def _generate_ai_analysis(data):
    """Generate AI analysis using OpenAI GPT model."""
    client = get_openai_client()
    business_text = create_narrative_text(data)
    
    prompt = _create_analysis_prompt(business_text)
    
    logger.debug(f"Sending prompt to OpenAI: {prompt[:200]}...")  # Log first 200 chars
    
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system", 
                    "content": "You are a helpful business analyst providing actionable insights."
                },
                {
                    "role": "user", 
                    "content": prompt
                }
            ],
            max_tokens=500,
            temperature=0.7,
        )
        
        analysis_results = completion.choices[0].message.content.strip()
        logger.debug("Successfully generated AI analysis")
        
        return analysis_results
    
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        raise

def _create_analysis_prompt(business_text):
    """Create the analysis prompt for OpenAI."""
    return f"""
    Analyze the following business information:

    {business_text}

    Using concrete estimates and action-oriented language, provide your response under these exact headings:

    Market Position:
    - Provide a competitor overview and your best estimate of market share (e.g., "~12% of regional off-grid solar market").
    - Call out any missing data and suggest how to fill it.

    Growth Potential:
    - List 2–3 opportunities with numeric clues (e.g., "inbound inquiries +30% YoY").
    - List 2–3 risks with timeframes or probabilities (e.g., "supply delays up to 8 weeks").
    - Give 1–2 growth indicators.

    Operational Insights:
    - Recommend 2–3 process improvements with target reductions (e.g., "reduce supply-chain delays by 20%").
    - Identify 1–2 resource gaps.
    - Suggest 1 efficiency metric to track.

    Strategic Recommendations:
    - Give 5 concrete steps, each starting with a verb, each tagged "Priority: High/Medium/Low".
    """