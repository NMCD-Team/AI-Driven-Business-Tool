from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

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
    path('api/', include('assessment.urls')),  # Include assessment.urls, not api.urls
    path('api/token/', include('your_auth_app.urls')),  # If you have separate auth URLs
]