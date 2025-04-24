from django.contrib import admin
from .models import BusinessAssessment

@admin.register(BusinessAssessment)
class BusinessAssessmentAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'email']
    search_fields = ['company_name', 'email', 'full_name']
    list_filter = ['industry_niche']
    # readonly_fields = ['created_at', 'updated_at']

