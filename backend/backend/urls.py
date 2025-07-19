
from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

def root_view(request):
    return JsonResponse({
        "message": "AI-Driven Business Tool API",
        "version": "1.0.0",
        "endpoints": {
            "api": "/api/",
            "admin": "/admin/",
            "auth": "/api/auth/",
            "assessments": "/api/assessments/",
            "reports": "/api/reports/"
        }
    })

urlpatterns = [
    path('', root_view, name='root'),
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/', include('assessment.urls')),
]