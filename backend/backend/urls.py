from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
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
        }
    })

urlpatterns = [
    path('', root_view, name='root'),
    path('admin/', admin.site.urls),
    path('api/', include('assessment.urls')),  # Include assessment URLs under /api/
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]