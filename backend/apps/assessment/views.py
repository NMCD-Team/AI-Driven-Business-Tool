
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import spacy
import requests
import os
from textblob import TextBlob
from collections import defaultdict
from typing import List, Dict
from dotenv import load_dotenv
from newsapi import NewsApiClient


load_dotenv()


class AnalyzeBusinessView(APIView):
    def __init__(self):
        super().__init__()
        self.nlp = spacy.load("en_core_web_sm")
        self.news_api_key = os.environ.get("NEWS_API_KEY")
        self.entity_categories = {  # Initialize entity_categories here
            'MARKET': ['market', 'industry', 'sector', 'niche'],
            'GROWTH': ['growth', 'expansion', 'increase', 'opportunity'],
            'OPERATIONS': ['process', 'operation', 'management', 'efficiency'],
            'CHALLENGES': ['challenge', 'problem', 'issue', 'difficulty'],
            'STRENGTHS': ['strength', 'advantage', 'success', 'achievement']
        
        }

    def _analyze_growth_potential(self, doc):
    # Implement your growth potential analysis logic here
        growth_analysis = {
            'opportunities': [],
            'risks': [],
            'growth_indicators': []
        }
        for ent in doc.ents:
            if ent.label_ in ('PERCENT', 'MONEY'):
                growth_analysis['growth_indicators'].append(ent.text)

        return growth_analysis

    def post(self, request):
        try:  # Main try-except block for the entire view
            data = request.data

            print("Received data:", json.dumps(data, indent=4))
            # Validate input data (add more checks as needed)
            if not isinstance(data, dict):
                return Response({"error": "Invalid input data format."}, status=status.HTTP_400_BAD_REQUEST)

            business_narrative = self._create_business_narrative(data)
            doc = self.nlp(business_narrative)

            industry = data.get("industry_niche", "").lower()
            products_services = data.get("main_products", "").lower()

            news_sentiment = self.analyze_news_sentiment(industry, products_services)
            # google_trends = self.get_google_trends(products_services) if pytrends else "Pytrends not available."

            business_narrative = self._create_business_narrative(data)
            doc = self.nlp(business_narrative)

            # Call _analyze_market_position and include its results
            market_position_analysis = self._analyze_market_position(doc, data.get("industry_niche", "").lower()) 
            
            analysis = {
                # "market_position": self._analyze_market_position(doc, industry),
                "growth_potential": self._analyze_growth_potential(doc),
                "operational_insights": self._analyze_operations(business_narrative),                 "strategic_recommendations": self._generate_strategic_recommendations(doc),
                "key_entities": self._extract_key_entities(doc),
                "sentiment_analysis": self._analyze_sentiment(doc),
                "news_sentiment": news_sentiment,
            }
            print("Analysis results:", json.dumps(analysis, indent=4))

            return Response({"status": "success", "analysis": analysis}, status=status.HTTP_200_OK)

        except Exception as e:  # Catch any unexpected errors
            print(f"Error in AnalyzeBusinessView: {e}")  # Print error for debugging
            return Response({"status": "error", "message": "An error occurred during analysis."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def _create_business_narrative(self, data: Dict) -> str:
        return f"""
            {data.get('company_name')} is a {data.get('industry_niche')} business operating for {data.get('years_in_business')} years with {data.get('number_of_employees')} employees. 
            They offer {data.get('main_products')} and their current performance is {data.get('current_performance')}. 
            Their biggest challenges are {data.get('biggest_challenges')}, and their vision is {data.get('business_vision')}. 
            Their target market is {data.get('target_customers')}, and their market research shows {data.get('market_research')}. 
            They compete with {data.get('main_competitors')}.
        """

    def _analyze_market_position(self, doc, industry):
        market_insights = {"positioning": [], "trends": [], "market_share": []}
        for sent in doc.sents:
            if any(term in sent.text.lower() for term in ["market", "competitor", "industry"]):
                market_insights["positioning"].append(sent.text)
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

    def analyze_news_sentiment(self, industry, products_services):
        if not self.news_api_key:
            return "News API key not configured."
        url = f"https://newsapi.org/v2/everything?q={industry}+{products_services}&apiKey={self.news_api_key}"
        try:
            response = requests.get(url)
            response.raise_for_status()
            news_data = response.json()
            if news_data['status'] == 'ok' and news_data['totalResults'] > 0:
                sentiments = [TextBlob(article['title']).sentiment.polarity for article in news_data['articles']]
                avg_sentiment = sum(sentiments) / len(sentiments) if sentiments else 0
                return {"overall_sentiment": "Positive" if avg_sentiment > 0 else "Negative" if avg_sentiment < 0 else "Neutral"}
            return "No relevant news found."
        except Exception as e:
            print(f"Error fetching news: {e}")
            return "Error fetching news data."

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
