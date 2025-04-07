from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import spacy

class AnalyzeBusinessView(APIView):
    def post(self, request):
        try:
            data = request.data
            print("Received data:", data)  
            
            nlp = spacy.load('en_core_web_sm')
            
            # Create a comprehensive business profile text
            business_profile = f"""
                Business Profile: {data.get('company_name')} is a {data.get('industry_niche')} business 
                that has been operating for {data.get('years_in_business')} years with {data.get('number_of_employees')} employees.
                
                Their main products/services: {data.get('main_products')}
                
                Current Performance: {data.get('current_performance')}
                
                Major Challenges: {data.get('biggest_challenges')}
                
                Business Vision: {data.get('business_vision')}
                
                Primary Goals: {data.get('primary_goals')}
                
                Target Market: {data.get('target_customers')}
                
                Market Research: {data.get('market_research')}
                
                Competition: {data.get('main_competitors')}
            """
            
            # Process with spaCy
            doc = nlp(business_profile)
            
            # Analyze key aspects
            business_analysis = {
                'market_position': self.analyze_market_position(doc),
                'growth_potential': self.analyze_growth_potential(doc),
                'operational_insights': self.analyze_operations(doc),
                'strategic_recommendations': self.generate_strategic_recommendations(doc)
            }
            
            return Response({
                'status': 'success',
                'message': 'Analysis completed successfully',
                'analysis': business_analysis
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            print("Error in analysis:", str(e))
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def analyze_market_position(self, doc):
        # Use spaCy to analyze market position
        market_insights = []
        for sent in doc.sents:
            if any(keyword in sent.text.lower() for keyword in ['market', 'customer', 'competitor', 'industry']):
                market_insights.append(sent.text.strip())
        return market_insights

    def analyze_growth_potential(self, doc):
        # Analyze growth opportunities
        growth_insights = []
        for sent in doc.sents:
            if any(keyword in sent.text.lower() for keyword in ['growth', 'expand', 'increase', 'opportunity', 'potential']):
                growth_insights.append(sent.text.strip())
        return growth_insights

    def analyze_operations(self, doc):
        # Analyze operational aspects
        operational_insights = []
        for sent in doc.sents:
            if any(keyword in sent.text.lower() for keyword in ['process', 'operation', 'management', 'staff', 'employee']):
                operational_insights.append(sent.text.strip())
        return operational_insights

    def generate_strategic_recommendations(self, doc):
        # Generate strategic recommendations based on the analysis
        recommendations = []
        
        # Analyze sentiment and context
        for sent in doc.sents:
            sent_text = sent.text.lower()
            
            # Look for challenges and opportunities
            if 'challenge' in sent_text or 'problem' in sent_text:
                recommendations.append(f"Address identified challenge: {sent.text.strip()}")
            
            if 'goal' in sent_text or 'vision' in sent_text:
                recommendations.append(f"Strategic opportunity: {sent.text.strip()}")
                
            # Look for specific business aspects
            if 'customer' in sent_text:
                recommendations.append("Enhance customer experience and engagement")
            if 'market' in sent_text:
                recommendations.append("Strengthen market position through targeted strategies")
            if 'competitor' in sent_text:
                recommendations.append("Develop competitive advantages and differentiation")

        return recommendations