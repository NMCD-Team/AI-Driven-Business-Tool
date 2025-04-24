from unittest.mock import patch, MagicMock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from assessment.models import BusinessAssessment  # Import your model directly

class AnalyzeViewTest(APITestCase):
    @patch('assessment.api.openai.ChatCompletion.create')  # Mock the correct OpenAI API call
    def test_analyze_view(self, mock_openai_create):
        # Mock the OpenAI API response (updated for ChatCompletion)
        mock_response = MagicMock()
        mock_response.choices = [MagicMock(message={'content': 'Mock AI Response'})]
        mock_openai_create.return_value = mock_response

 
        data = {
            'email': 'test@example.com',
            'full_name': 'Test User',
            'business_description': 'A sample business description.',
        }

        url = reverse('analyze') 
        response = self.client.post(url, data=data, format='json') 

        self.assertEqual(response.status_code, status.HTTP_201_CREATED) 
        self.assertEqual(response.data['analysis_results'], 'Mock AI Response')

       
        mock_openai_create.assert_called_once_with(
            model="gpt-3.5-turbo",  
            messages=[
                {'role': 'system', 'content': 'You are a helpful business analyst.'},
                {'role': 'user', 'content': 'Analyze the following business information:\nA sample business description.\n\nConsider these additional details:\n\nAnswer these specific questions:\n'}
            ],
            max_tokens=500,  
            temperature=0.7,  
        )

        self.assertEqual(BusinessAssessment.objects.count(), 1)
        assessment = BusinessAssessment.objects.first()
        self.assertEqual(assessment.business_description, 'A sample business description.')
