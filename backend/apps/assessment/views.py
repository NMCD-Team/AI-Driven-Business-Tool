from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import BusinessAssessment
from .serializers import BusinessAssessmentSerializer
import spacy
import json

class BusinessAssessmentViewSet(viewsets.ModelViewSet):
    queryset = BusinessAssessment.objects.all()
    serializer_class = BusinessAssessmentSerializer

class AnalyzeBusinessView(APIView):
    def post(self, request):
        try:
            # Print received data for debugging
            print("Received data:", request.data)
            
            # Load spaCy model
            nlp = spacy.load('en_core_web_sm')
            
            # Combine relevant text fields for analysis
            analysis_text = f"{request.data.get('main_products', '')} {request.data.get('current_performance', '')} {request.data.get('business_vision', '')} {request.data.get('target_customers', '')}"
            
            # Process text with spaCy
            doc = nlp(analysis_text)
            
            # Perform analysis
            analysis_result = {
                'key_entities': [(ent.text, ent.label_) for ent in doc.ents],
                'key_phrases': [chunk.text for chunk in doc.noun_chunks],
                'recommendations': self.generate_recommendations(doc),
            }
            
            return Response({
                'status': 'success',
                'message': 'Analysis completed successfully',
                'data': request.data,
                'analysis': analysis_result
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            print("Error in view:", str(e))  # Debug print
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def generate_recommendations(self, doc):
        recommendations = []
        
        # Example recommendation logic
        if len(doc.ents) < 5:
            recommendations.append("Consider providing more detailed information about your business operations")
        
        # Add more business-specific recommendations
        if any(token.text.lower() in ['expand', 'growth', 'scale'] for token in doc):
            recommendations.append("Consider developing a detailed growth strategy")
        
        if any(token.text.lower() in ['customer', 'client'] for token in doc):
            recommendations.append("Focus on customer relationship management")
        
        return recommendations