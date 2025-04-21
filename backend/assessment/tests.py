from unittest.mock import patch, MagicMock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
# ... your imports

class AnalyzeViewTest(APITestCase):
    @patch('assessment.views.Assessment')  # Mock the Assessment model
    @patch('openai.completions.create') # Mock the OpenAI API call
    def test_analyze_view(self, mock_openai_create, MockAssessment):
        # Mock the OpenAI API response
        mock_openai_create.return_value = MagicMock(choices=[MagicMock(text='Mock AI Response')])

        # Mock the Assessment model's save method
        mock_assessment_instance = MockAssessment.return_value
        mock_assessment_instance.save.return_value = None  # No actual saving

        # Sample test data
        data = {'business_description': 'A sample business description.'}

        # Make the request
        response = self.client.post(reverse('analyze'), data=data)

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['analysis_results'], 'Mock AI Response')  # Check the response

        # Check if OpenAI API was called with the correct parameters (optional)
        mock_openai_create.assert_called_once() # At least once
        # Add more specific assertions about the call arguments if needed

        # Check if the Assessment model's save method was called (optional)
        mock_assessment_instance.save.assert_called_once()