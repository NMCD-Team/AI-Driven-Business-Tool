from django.db import models

class BusinessAssessment(models.Model):
    email = models.EmailField()
    full_name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    industry_niche = models.CharField(max_length=255)
    years_in_business = models.CharField(max_length=50)
    number_of_employees = models.CharField(max_length=50)
    annual_revenue = models.CharField(max_length=100)
    geographic_locations = models.TextField(blank=True)
    
    # Current State
    main_products = models.TextField()
    current_performance = models.TextField()
    biggest_challenges = models.TextField()
    
    # Ideal State
    business_vision = models.TextField()
    primary_goals = models.TextField()
    specific_outcomes = models.TextField(blank=True)
    
    # Market Analysis
    market_research = models.TextField()
    target_customers = models.TextField()
    main_competitors = models.TextField()
    
    # Brand Identity
    brand_identity = models.TextField()
    brand_values = models.TextField()
    brand_assets = models.TextField()
    
    # Operations
    organizational_structure = models.TextField()
    operations_management = models.TextField()
    operational_challenges = models.TextField()
    
    # Business Planning
    business_plan = models.TextField()
    business_goals = models.TextField()
    progress_tracking = models.TextField()
    
    # Additional Information
    additional_info = models.TextField(blank=True)
    specific_questions = models.TextField(blank=True)
    
    # Analysis Results
    analysis_result = models.JSONField(null=True, blank=True)
    

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Assessment for {self.company_name} - {self.created_at}"

    class Meta:
        ordering = ['-created_at']