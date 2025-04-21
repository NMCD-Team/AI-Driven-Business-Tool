from django.contrib import admin
from .models import BusinessAssessment

@admin.register(BusinessAssessment)
class BusinessAssessmentAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'email', 'created_at']
    search_fields = ['company_name', 'email', 'full_name']
    list_filter = ['created_at', 'industry_niche']
    readonly_fields = ['created_at', 'updated_at']

