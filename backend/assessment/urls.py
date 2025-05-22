from django.urls import path
from .views import AnalyzeView, ReportDetailView

urlpatterns = [
    path('analyze/', AnalyzeView.as_view(), name='analyze'),
    path('reports/<int:report_id>/', ReportDetailView.as_view(), name='report_detail'),
]