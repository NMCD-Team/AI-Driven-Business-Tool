from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BusinessAssessmentViewSet, AnalyzeBusinessView

router = DefaultRouter()
router.register(r'assessments', BusinessAssessmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('analyze/', AnalyzeBusinessView.as_view(), name='analyze-business'),
]