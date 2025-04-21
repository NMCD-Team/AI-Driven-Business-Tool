from dotenv import load_dotenv
load_dotenv()

import json
from pyexpat.errors import messages
import logging
import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import BusinessAssessment, Questionnaire
from .serializers import AnalyzeSerializer,  UserSerializer, QuestionnaireSerializer
import spacy
import requests
import os
print(os.environ.get("OPENAI_API_KEY"))
from textblob import TextBlob
from collections import defaultdict
from typing import List, Dict
from newsapi import NewsApiClient
from rest_framework import viewsets, generics, permissions, status
from openai import OpenAI
from rest_framework.decorators import api_view # ... other imports




openai.api_key = os.environ.get("OPENAI_API_KEY")
logger = logging.getLogger(__name__)  # Configure logger


@api_view(['POST'])
def analyze(request):
    serializer = AnalyzeSerializer(data=request.data.get('data'))
    if serializer.is_valid():
        assessment_id = serializer.validated_data['assessment_id']
        description = serializer.validated_data['description']
        focus_areas = serializer.validated_data.get('focus_areas', [])  # Handle missing focus_areas
        num_suggestions = serializer.validated_data['num_suggestions']

        try:
            assessment = BusinessAssessment.objects.get(pk=assessment_id)

        except BusinessAssessment.DoesNotExist:
            return Response({"error": "Assessment not found"}, status=status.HTTP_404_NOT_FOUND)

        description = serializer.validated_data['description']
        _ = description

        num_suggestions = serializer.validated_data['num_suggestions']
        _ = num_suggestions
        # Construct the prompt for OpenAI (improved)
        prompt = f"Analyze the market position and growth potential for this assessment:\n\n{assessment.description}\n\nFocus on these areas: {', '.join(focus_areas) if focus_areas else 'General Analysis'}"


        try:
            response = openai.completions.create(
                model="gpt-3.5-turbo",  # Or a suitable model like "gpt-4"
                messages=[
                    {"role": "system", "content": "You are a helpful business analyst."},  # Optional
                    {"role": "user", "content": prompt}  # Your prompt goes here
                ], # Adjust as needed
                # n=1,
                # stop=None,
                max_tokens=500,  # Adjust as needed

                temperature=0.7,  # Adjust as needed
            )

            analysis_results = response.choices[0].message.content.strip()


            return Response({'analysis_results': analysis_results}, status=status.HTTP_200_OK)

        except openai.error.OpenAIError as e: # Handle OpenAI specific errors
            return Response({"error": f"OpenAI API Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:  # Catch other exceptions
            return Response({"error": f"An unexpected error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated] 

    def get_object(self):
        return self.request.user 
    
    def update(self, request, *args, **kwargs): # Improved update method
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data) 

class UserReportsView(generics.ListAPIView):
    serializer_class = AnalyzeSerializer
    permission_classes = [permissions.IsAuthenticated]

class QuestionnaireDetailView(generics.RetrieveAPIView):  # Example detail view
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

class QuestionnaireCreateView(generics.CreateAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

class BusinessAssessmentCreateView(generics.CreateAPIView):
    queryset = BusinessAssessment.objects.all()
    serializer_class = AnalyzeSerializer

class BusinessAssessmentViewSet(viewsets.ModelViewSet):
    queryset = BusinessAssessment.objects.all()
    serializer_class = AnalyzeSerializer

class AnalyzeBusinessView(APIView):
    def __init__(self):
        super().__init__()
        self.nlp = spacy.load("en_core_web_sm")
        self.news_api_key = os.environ.get("NEWS_API_KEY")
        self.client = openai.OpenAI()  # Initialize client here

        self.entity_categories = {  # Initialize entity_categories here
            'MARKET': ['market', 'industry', 'sector', 'niche'],
            'GROWTH': ['growth', 'expansion', 'increase', 'opportunity'],
            'OPERATIONS': ['process', 'operation', 'management', 'efficiency'],
            'CHALLENGES': ['challenge', 'problem', 'issue', 'difficulty'],
            'STRENGTHS': ['strength', 'advantage', 'success', 'achievement']
        
        }
        openai.api_key = os.environ.get("OPENAI_API_KEY") # Get API key here
        self.client = openai.OpenAI()

    def analyze_business(self, request, assessment_id, focus_areas=None, num_suggestions=5):
        try:
            assessment = BusinessAssessment.objects.get(pk=assessment_id)
            narrative_dict = self._create_narrative_dict(assessment)  # Use the model instance

            # model = assessment.openai_model  # Use the model specified in settings
            analysis_type = assessment.analysis_type

            narrative = f"Company Name: {assessment.company_name}\n" \
                        f"Industry: {assessment.industry_niche}\n" \
                        f"Years in Business: {assessment.years_in_business}\n" \
                        f"Number of Employees: {assessment.number_of_employees}\n" \
                        f"Main Products/Services: {assessment.main_products}\n" \
                        f"Current Performance: {assessment.current_performance}\n" \
                        f"Biggest Challenges: {assessment.biggest_challenges}\n" \
                        # ... add other relevant fields ...

            # messages = [
            #     {"role": "system", "content": f"You are a business analyst. Analyze the following business narrative, focusing on {', '.join(focus_areas)}, and suggest {num_suggestions} areas for improvement."},
            #     {"role": "user", "content": narrative}
            # ]
            focus_areas = []
            
            if focus_areas is None:  # If not provided, determine from analysis_type
                if analysis_type == 'market_position':
                    focus_areas = ["market analysis", "competitors", "target customers"]
                # ... (other analysis_type conditions)
                else:  # Comprehensive analysis
                    focus_areas = ["market position", "growth potential", "operational efficiency", "competitive landscape", "financial health"]

            prompt = f"Analyze the following business description, focusing on {', '.join(focus_areas)}:\n{self._create_narrative_text(narrative_dict)}" # Use narrative_dict


            focus_areas = ["market position", "growth potential", "operational efficiency", "competitive landscape", "financial health"]  # Or get this from the request data

     
            response = self.client.chat.completions.create( # Use self.client
                model="gpt-3.5-turbo",  # Or a suitable model like "gpt-4"
                messages=[
                    {"role": "system", "content": "You are a helpful business analyst."},  # Optional
                    {"role": "user", "content": prompt} 
                  
                ],
                max_tokens=500,  # Adjust as needed
                temperature=0.7,
            )
            
            num_suggestions = 5
            analysis = response.choices[0].message.content.strip()
            suggestions = self.extract_suggestions(analysis, num_suggestions) # Pass num_suggestions

            assessment.analysis_result = {"analysis": analysis, "suggestions": suggestions}
            assessment.save()

            return assessment.analysis_result  # Return the updated assessment

        except Exception as e:
            logger.error(f"Error during OpenAI analysis: {e}")
            return {"error": str(e)}

        
    def extract_suggestions(self, text, num_suggestions=None):  # Corrected signature
        # (Improved suggestion extraction logic - example using regex)
        import re
        num_suggestions = 5 # Or get this from settings

        suggestion_pattern = r"(Suggestion|Recommendation):\s*(.*?)(?=\n|$)"  # Regex to find suggestions
        matches = re.findall(suggestion_pattern, text, re.IGNORECASE | re.MULTILINE)
        suggestions = [match[1].strip() for match in matches]
        return suggestions[:num_suggestions] if num_suggestions else suggestions

    def _analyze_growth_potential(self, doc, narrative_dict):
        print("Inside _analyze_growth_potential:", narrative_dict)  # Print to verify

        growth_analysis = {
            "opportunities": [],
            "risks": [],
            "growth_indicators": []
        }

        if narrative_dict.get("growth_plans"):
            growth_plans = narrative_dict["growth_plans"]
            # Example: Add specific opportunities based on growth plans
            if "expand to new markets" in growth_plans.lower():
                growth_analysis["opportunities"].append("Opportunity: Expanding to new markets.")

        for sent in doc.sents:
            sent_lower = sent.text.lower()

            if any(keyword in sent_lower for keyword in ["opportunity", "potential", "expand", "grow"]):
                growth_analysis["opportunities"].append(sent.text)

            if any(keyword in sent_lower for keyword in ["risk", "challenge", "threat", "problem", "issue"]):
                growth_analysis["risks"].append(sent.text)

            # Improved growth indicator extraction (using spaCy's entities)
            for ent in sent.ents:
                if ent.label_ in ("PERCENT", "MONEY"):
                    growth_analysis["growth_indicators"].append(ent.text)

        return growth_analysis

    def post(self, request):
        print("Request Data:", request.data) # Print the request data for debugging
        openai.api_key = os.environ.get("OPENAI_API_KEY")  # Set API key here
        client = openai.OpenAI() 
        try:  
            assessment_id = request.data.get("assessment_id") # Get and convert assessment_id
            focus_areas = request.data.get("focus_areas")
            description = request.data.get("description", "")  # Optional field
            num_suggestions = request.data.get("num_suggestions", 5)

            if assessment_id is None:  # Check if assessment_id is missing or null
                return Response({"error": "assessment_id is required"}, status=400)

            try:
                assessment_id = int(assessment_id)  # Convert to int after checking for None
            except (TypeError, ValueError):
                return Response({"error": "Invalid assessment_id (not an integer)"}, status=400)
        
            analysis_result = self.analyze_business(request, assessment_id, focus_areas)

            assessment = BusinessAssessment.objects.get(pk=assessment_id) # Get assessment here
            narrative_dict = self._create_narrative_dict(assessment, description) # Include description

            prompt = self._create_narrative_text(narrative_dict) # Use narrative_dict consistently
            data = request.data
            assessment_id = data.get("assessment_id")
            focus_areas = data.get("focus_areas")  # Get focus areas from request
            num_suggestions = data.get("num_suggestions", 5) # Get num_s

            narrative_text = self._create_narrative_text(data)

            industry = data.get("industry_niche", "")  # Get the industry from the request data
            products_services = data.get("main_products", "").lower()  # Use data, not narrative
            
            messages = [  # Create a LIST of message dictionaries
                {"role": "system", "content": "You are a business analyst."},
                {"role": "user", "content": prompt}
            ]
            
            response = client.chat.completions.create(
                model="gpt-4.1-nano",       # Required: The name of the OpenAI model to use (e.g., "gpt-3.5-turbo")
                messages=messages,  # Required: A list of messages comprising the conversation.
                max_tokens=500,    # Optional: The maximum number of tokens to generate.
                temperature=0.7, 
            )
            openai_analysis = response.choices[0].message.content.strip() # Access the content from the message


            narrative_text = self._create_narrative_text(data) 
            print("Narrative Text:", narrative_text)

            if not narrative_text:
                return Response({"status": "error", "message": "Insufficient data provided."}, status=400)
            narrative_dict = self._create_narrative_dict(data) 
            print("Narrative Text:", narrative_text)  # Verify
            print("Narrative Dict:", narrative_dict) 
            doc = self.nlp(narrative_text)
            news_sentiment = self.analyze_news_sentiment(narrative_dict) # Pass narrative_dict


            print("Narrative in post:", narrative_dict)
            focus_areas = ["market position", "growth potential", "operational efficiency", "competitive landscape", "financial health"]  # Define focus_areas
            try:
                assessment_id = int(assessment_id)
            except (ValueError, TypeError):
                return Response({"error": "Invalid assessment_id"}, status=400)
            
            analysis_result = self.analyze_business(request, assessment_id, focus_areas, num_suggestions)
            if "error" in analysis_result:  # Check for errors from analyze_business
                return Response(analysis_result, status=500)
            market_analysis = self._analyze_market_position(doc, narrative_dict, industry) # Use narrative_dict
            growth_potential = self._analyze_growth_potential(doc, narrative_dict) 
            operational_insights = self._analyze_operations(narrative_text, narrative_dict) # Pass narrative
            strategic_recommendations = self._generate_strategic_recommendations(doc)
            key_entities = self._extract_key_entities(doc)
            sentiment_analysis = self._analyze_sentiment(doc)

            if isinstance(analysis_result, dict):
                analysis = analysis_result["analysis"]
                suggestions = analysis_result["suggestions"]
            else:
                analysis = analysis_result
                suggestions = []

            analysis = {
                "openai_analysis": openai_analysis,       # OpenAI's general analysis
                "openai_suggestions": suggestions,  # 
                "market_position": market_analysis,  # Include the results
                "growth_potential": growth_potential,  # Include the results
                "operational_insights": operational_insights, 
                "strategic_recommendations": strategic_recommendations,
                "key_entities": key_entities,
                "sentiment_analysis": sentiment_analysis,
                "news_sentiment": news_sentiment,
            }
            
            print("Analysis results:", json.dumps(analysis, indent=4))

            return Response(analysis_result, status=200) # Return the analysis result directly

        except BusinessAssessment.DoesNotExist:  # Handle the case where the assessment is not found
            return Response({"error": "Assessment not found"}, status=404)
        except Exception as e:
            logger.exception(f"Error in AnalyzeBusinessView: {e}") # Log the exception
            return Response({"error": str(e)}, status=500) # Return any errors

    def analyze_competitor_sentiment(self, doc):
        # Implement your competitor sentiment analysis logic here using TextBlob or other methods
        # Example (using TextBlob):
        competitor_sentiments = {}
        for ent in doc.ents:
            if ent.label_ == "ORG":  # Assuming competitors are organizations
                sentiment = TextBlob(ent.text).sentiment.polarity
                competitor_sentiments[ent.text] = sentiment
        return competitor_sentiments
    




    def _create_narrative_text(self, description, narrative_dict): # Modified function signature
        return f"Description: {description}\n{narrative_dict.get('company_name', '')} is a ..."


    def _create_narrative_dict(self, data: Dict) -> Dict:
        """Structures the input data for analysis."""
        narrative = {}
        for key, value in data.items():
            cleaned_value = str(value).strip() if value is not None else ""
            narrative[key] = cleaned_value
        return narrative
    
    def _analyze_market_position(self, doc, narrative_dict, industry):
        print("Inside _analyze_market_position", narrative_dict)
        print("Type of doc:", type(doc))  # Should print <class 'spacy.tokens.doc.Doc'>
        print("Type of narrative:", type(narrative_dict))    

        market_insights = {
            "positioning": [],  # Initialize
            "competitors": narrative_dict.get("main_competitors", "No competitors specified."),
            "market_share": narrative_dict.get("market_share", "No market share data provided."),
            "positioning": [],
            "trends": []
        }
        for sent in doc.sents:
        # Competitor analysis (more sophisticated)
            if market_insights["competitors"]:
                competitors = narrative_dict.get("main_competitors", "None specified") # Correct: Use narrative.get()
                market_insights["competitor_analysis"] = {
                    "count": len(competitors),
                    "competitors": competitors,  # List of competitors
                    # Add more analysis like competitor strengths/weaknesses, market positioning, etc.
                }
                # Example: Check if specific competitors are mentioned (replace with your relevant competitors)
                if any(c in competitors for c in ["Company A", "Company B"]):
                    market_insights["competitor_analysis"]["key_competitor_present"] = True


            # Positioning analysis (more sophisticated)
            if narrative_dict.get("competitive_advantages"):
                advantages = [a.strip() for a in narrative_dict.get("competitive_advantages").split(",")]
                market_insights["positioning"].extend([f"Competitive Advantage: {a}" for a in advantages])

            # Industry-specific trends (more sophisticated - example)
            if industry == "renewable energy":
                market_insights["trends"].append("Trend: Growing demand due to climate change concerns.")
                market_insights["trends"].append("Trend: Increasing government incentives and subsidies.")
                # ... add more trends
            elif industry == "fast food":  # Example for a different industry
                market_insights["trends"].append("Trend: Growing demand for healthier and plant-based options.")
                # ... add more trends

            return market_insights

    def _analyze_operations(self, text):
        """
        Performs the core business analysis operations.
        """
        try:
            # 1. Data Validation
            if not text:
                raise ValueError("No 'text' provided for analysis.")

            doc = self.nlp(text)  # Process the text with spaCy
            
            operational_insights = {
            "processes": [],
            "resources": [],
            "efficiency_metrics": []
            }

            for sent in doc.sents:
                sent_lower = sent.text.lower()

                if any(term in sent_lower for term in ["process", "procedure", "workflow", "system", "operation"]):
                    operational_insights["processes"].append(sent.text)

                if any(term in sent_lower for term in ["resource", "asset", "equipment", "staff", "employee", "technology"]):
                    operational_insights["resources"].append(sent.text)

                if any(term in sent_lower for term in ["efficiency", "metric", "kpi", "performance", "productivity"]):
                    operational_insights["efficiency_metrics"].append(sent.text)
            
            entities = [{'text': ent.text, 'label': ent.label_} for ent in doc.ents]  # Create list of dictionaries
            # 3. Sentiment Analysis (TextBlob)
            analysis = TextBlob(text)
            sentiment = {
                'polarity': analysis.sentiment.polarity,
                'subjectivity': analysis.sentiment.subjectivity
            }

            # 4. News API Integration (Example)
            news_api_key = os.environ.get("NEWS_API_KEY") # Get API key securely
            if not news_api_key:
                raise ValueError("NEWS_API_KEY environment variable not set.")

            news_client = NewsApiClient(api_key=news_api_key)
            top_headlines = news_client.get_top_headlines(q=text, language='en', page_size=3) # Example query
            news = top_headlines.get('articles', [])

            results = {
                "entities": entities,
                "sentiment": sentiment,
                "news": news,
                # "trends": trends,
            }
            return results

        except Exception as e:
            # Log the error for debugging
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Error in _analyze_operations: {e}")

            # Choose how to handle exceptions:
            #   - Re-raise for the calling function to handle:
            raise
            #   - Or return an error response directly:
            # return {"error": str(e)}

    def analyze_news_sentiment(self, narrative_dict):  # Pass narrative_dict
        if not self.news_api_key:
            return "News API key not configured."

        industry = narrative_dict.get("industry_niche", "")
        products_services = narrative_dict.get("main_products", "")

        # Create a meaningful search query
        query = f"{industry} {products_services}"
        if not query.strip(): # Check if the query is empty
            return "No search terms provided for news sentiment analysis."
        
        url = f"https://newsapi.org/v2/everything?q={query}&apiKey={self.news_api_key}" 
        try:
            response = requests.get(url)
            response.raise_for_status()
            news_data = response.json()
            if news_data['status'] == 'ok' and news_data['totalResults'] > 0:
                sentiments = [TextBlob(article['title']).sentiment.polarity for article in news_data['articles']]
                avg_sentiment = sum(sentiments) / len(sentiments) if sentiments else 0
                return {"overall_sentiment": "Positive" if avg_sentiment > 0 else "Negative" if avg_sentiment < 0 else "Neutral"}
            return "No relevant news found."
        except requests.exceptions.RequestException as e: # Catch request errors
            logger.error(f"Error fetching news: {e}")
            return {"error": "Error fetching news data."} # Return error as dict
        except Exception as e: # Catch other errors
            logger.exception(f"Error during news sentiment analysis: {e}")
            return {"error": "Error analyzing news sentiment."}

    def _extract_key_entities(self, doc) -> Dict:
        entities = defaultdict(list)
        for ent in doc.ents:
            entities[ent.label_].append(ent.text)
        for chunk in doc.noun_chunks:
            entities['NOUN_PHRASES'].append(chunk.text)
        return dict(entities)

    def _analyze_sentiment(self, doc) -> Dict:
        sentiment_scores = defaultdict(float)
        sentence_count = 0
        for sent in doc.sents:
            sentence_count += 1
            sent_score = sum(token.sentiment for token in sent if token.sentiment != 0)
            sentiment_scores['total'] += sent_score
            for category, keywords in self.entity_categories.items():
                if any(keyword in sent.text.lower() for keyword in keywords):
                    sentiment_scores[category] += sent_score
        return {k: v / sentence_count for k, v in sentiment_scores.items()}


    def _generate_strategic_recommendations(self, doc) -> List[Dict]:
        recommendations = []
        for sent in doc.sents:
            root = next((token for token in sent if token.dep_ == "ROOT"), None)
            if root and root.pos_ == "VERB":
                recommendations.append({
                    "action": root.text,
                    "context": sent.text,
                    "priority": self._calculate_priority(sent),
                })
        return recommendations

    def _calculate_priority(self, sent) -> str:
        return "high" if any(term in sent.text.lower() for term in ["immediate", "urgent", "critical"]) else "medium"
