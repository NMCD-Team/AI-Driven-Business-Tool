from django.urls import path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import views

@api_view(['GET'])
def api_root(request):
    return Response({
        "message": "AI Business Tool API is running!",
        "version": "1.0",
        "endpoints": {
            "authentication": {
                "login": "/api/token/",
                "refresh": "/api/token/refresh/",
                "token_auth": "/api/token-auth/"
            },
            "business": {
                "analyze": "/api/analyze/",
                "reports": "/api/reports/{report_id}/"
            }
        },
        "status": "operational"
    })

urlpatterns = [
    path('', api_root, name='api-root'),  
    path('analyze/', views.AnalyzeView.as_view(), name='analyze'),
    path('reports/<int:report_id>/', views.ReportDetailView.as_view(), name='report_detail'),
]