from django.urls import path
from .views import AnalyzeBusinessView

urlpatterns = [
    path('analyze/', AnalyzeBusinessView.as_view(), name='analyze-business'),
]