"""
URL configuration for AI_Business_Tool project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

# backend/AI_Business_Tool/urls.py

from django.urls import path, include
from django.contrib import admin
from assessment import api  # Import from api.py

from .views import (
    BusinessAssessmentCreateView,
    QuestionnaireCreateView,
    UserReportsView,
    UserProfileUpdateView
)
import sys
print("sys.path:", sys.path)

urlpatterns = [
    path('api/analyze/', api.analyze, name='analyze'),  # Make sure this is correct
    path('admin/', admin.site.urls),
    path('api/', include('assessment.urls')),
    path('assessment/', include('assessment.urls')),  # Include the assessment app's URLs

    
]

