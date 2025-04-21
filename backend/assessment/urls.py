from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views  # Import all views from the current directory

router = DefaultRouter()
router.register(r'assessments', views.BusinessAssessmentViewSet, basename='businessassessment')

urlpatterns = [
    path('', include(router.urls)),
    path('analyze/', views.AnalyzeBusinessView.as_view(), name='analyze-business'),  # Or views.analyze if using a function-based view
    path('assessment/create/', views.BusinessAssessmentCreateView.as_view(), name='create-assessment'),  # More descriptive URL
    path('questionnaire/create/', views.QuestionnaireCreateView.as_view(), name='create-questionnaire'),  # More descriptive URL
    path('users/<int:user_id>/reports/', views.UserReportsView.as_view(), name='user-reports'),  # Improved URL structure
    path('user-profile/update/', views.UserProfileUpdateView.as_view(), name='update-profile'), # More descriptive URL
]