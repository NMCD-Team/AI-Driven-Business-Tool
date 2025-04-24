from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BusinessAssessmentViewSet,
    AnalyzeBusinessView,
    BusinessAssessmentCreateView,
    QuestionnaireCreateView,
    UserReportsView,
    UserProfileUpdateView,
)

router = DefaultRouter()
router.register(r'assessments', BusinessAssessmentViewSet, basename='businessassessment')

urlpatterns = [
    path('', include(router.urls)),
    path('analyze/', AnalyzeBusinessView.as_view(), name='analyze-business'),
    path('assessment/create/', BusinessAssessmentCreateView.as_view(), name='create-assessment'),
    path('questionnaire/create/', QuestionnaireCreateView.as_view(), name='create-questionnaire'),
    path('users/<int:user_id>/reports/', UserReportsView.as_view(), name='user-reports'),
    path('user-profile/update/', UserProfileUpdateView.as_view(), name='update-profile'),
]
