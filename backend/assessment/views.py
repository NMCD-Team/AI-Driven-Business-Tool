import os, json, logging, re
import spacy
from openai import OpenAI
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import BusinessAssessment, Report, Questionnaire, UserProfile
from .serializers import (
    BusinessAssessmentSerializer,
    QuestionnaireSerializer,
    UserSerializer
)
from .utils import create_narrative_text

logger = logging.getLogger(__name__)

class AnalyzeBusinessView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self):
        super().__init__()
        self.nlp = spacy.load("en_core_web_sm")
        self.client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    def _split_analysis_sections(self, text):
        sections = {
            "Market Position": "",
            "Growth Potential": "",
            "Operational Insights": "",
            "Strategic Recommendations": ""
        }

        current_section = None
        for line in text.splitlines():
            line = line.strip()
            if not line:
                continue
            for title in sections:
                if re.match(f"^{title}[:]*", line, re.IGNORECASE):
                    current_section = title
                    sections[current_section] = ""
                    break
                elif current_section:
                    sections[current_section] += line + " "

        return sections

    def post(self, request):
        try:
            print("Received data:", request.data)
            print("Narrative Text Sent to GPT:\n", narrative_text)


            data = request.data
            assessment_id = data.get("assessment_id")

            print(f"Assessment ID: {assessment_id}")
            print(f"Form Data: {data}")

            if not assessment_id:
                return Response({"error": "assessment_id is required"}, status=400)

            try:
                assessment = BusinessAssessment.objects.get(pk=int(assessment_id))
            except (BusinessAssessment.DoesNotExist, ValueError):
                return Response({"error": "Assessment not found"}, status=404)

            narrative_text = create_narrative_text(data)
            print("Narrative Text Sent to GPT:\n", narrative_text)

    

            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages = [
                    {"role": "system", "content": "You are a helpful business analyst."},
                    {"role": "user", "content": f"""Analyze the following business information:

                {narrative_text}
                Using concrete estimates and action-oriented language, provide your response under these exact headings:

                Market Position:
                - Provide a competitor overview and your best estimate of market share (e.g., “~12% of regional off-grid solar market”).
                - Call out any missing data and suggest how to fill it.

                Growth Potential:
                - List 2 to 3 opportunities with numeric clues (e.g., “inbound inquiries +30% YoY”).
                - List 2 to 3 risks with timeframes or probabilities (e.g., “supply delays up to 8 weeks”).
                - Give 1 to 2 growth indicators.

                Operational Insights:
                - Recommend 2 to 3 process improvements with target reductions (e.g., “reduce supply-chain delays by 20%”).
                - Identify 1 to 2 resource gaps.
                - Suggest 1 efficiency metric to track.

                Strategic Recommendations:
                - Give 5 concrete steps, each starting with a verb, each tagged “Priority: High/Medium/Low”.
                """
            }
                ],

                max_tokens=500,
                temperature=0.7,
            )

            openai_analysis = response.choices[0].message.content.strip()
            print("OpenAI Response:\n", openai_analysis)
            if not openai_analysis:
                return Response({"error": "Failed to get analysis from GPT."}, status=500)

            report = Report.objects.create(
                assessment=assessment,
                content=openai_analysis
            )

            parsed_sections = self._split_analysis_sections(openai_analysis)
            print("Parsed Sections:", parsed_sections)

            structured_result = {
                "analysis_results": {
                    "market_position": {
                        "competitors": [parsed_sections.get("Market Position", "").strip()],
                        "market_share": re.findall(r'\bmarket share[s]?:?\s*(.+?)[\.\n]', parsed_sections.get("Market Position", ""), re.IGNORECASE),
                        "positioning": [parsed_sections.get("Market Position", "").strip()]
                    },
                    "growth_potential": {
                        "opportunities": re.findall(r'\bopportunit(?:y|ies):?\s*(.+?)[\.\n]', parsed_sections.get("Growth Potential", ""), re.IGNORECASE),
                        "risks": re.findall(r'\brisks?:?\s*(.+?)[\.\n]', parsed_sections.get("Growth Potential", ""), re.IGNORECASE),
                        "growth_indicators": [parsed_sections.get("Growth Potential", "").strip()]
                    },
                    "operational_insights": {
                        "processes": re.findall(r'\bprocess(?:es)?:?\s*(.+?)[\.\n]', parsed_sections.get("Operational Insights", ""), re.IGNORECASE),
                        "resources": re.findall(r'\bresources?:?\s*(.+?)[\.\n]', parsed_sections.get("Operational Insights", ""), re.IGNORECASE),
                        "efficiency_metrics": [parsed_sections.get("Operational Insights", "").strip()]
                    },
                    "strategic_recommendations": [
                        {
                            "action": "Implement changes based on recommendations",
                            "context": parsed_sections.get("Strategic Recommendations", "").strip(),
                            "priority": "high"
                        }
                    ]
                }
            }

            return Response({
                "analysis_results": structured_result["analysis_results"],
                "report_id": report.id
            })
        
        except Exception as e:
            logger.exception(f"Error in AnalyzeBusinessView: {e}")
            return Response({"error": str(e)}, status=500)


class BusinessAssessmentViewSet(viewsets.ModelViewSet):
    queryset = BusinessAssessment.objects.all()
    serializer_class = BusinessAssessmentSerializer
    permission_classes = [IsAuthenticated]


class BusinessAssessmentCreateView(generics.CreateAPIView):
    serializer_class = BusinessAssessmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class QuestionnaireCreateView(generics.CreateAPIView):
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserReportsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        if request.user.id != user_id:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        assessments = BusinessAssessment.objects.filter(user_id=user_id)
        serializer = BusinessAssessmentSerializer(assessments, many=True)
        return Response(serializer.data)


class UserProfileUpdateView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile
