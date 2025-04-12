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

from django.urls import path
from .views import (
    BusinessAssessmentCreateView,
    QuestionnaireCreateView,
    UserReportsView,
    UserProfileUpdateView
)

urlpatterns = [
    path('api/assessment/', BusinessAssessmentCreateView.as_view(), name='create-assessment'),
    path('api/questionnaire/', QuestionnaireCreateView.as_view(), name='create-questionnaire'),
    path('api/reports/<int:user_id>/', UserReportsView.as_view(), name='user-reports'),
    path('api/user-profile/', UserProfileUpdateView.as_view(), name='update-profile'),
]

