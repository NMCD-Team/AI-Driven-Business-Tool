from django.db import models
from django.contrib.auth.models import User 
from backend.settings import DEFAULT_ANALYSIS_TYPE, ANALYSIS_TYPES, DEFAULT_OPENAI_MODEL


class Questionnaire(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questionnaires', null=True, blank=True) # Link to User
    openai_api_key = models.CharField(max_length=255, blank=True) # User can override if needed
    openai_model = models.CharField(max_length=50, default=DEFAULT_OPENAI_MODEL)
    analysis_type = models.CharField(max_length=50, choices=[(t, t) for t in ANALYSIS_TYPES], default=DEFAULT_ANALYSIS_TYPE)
    assessment = models.ForeignKey('BusinessAssessment', on_delete=models.CASCADE, related_name='questionnaires', null=True, blank=True)  # Correct reference
   
    def __str__(self):
        return f"Questionnaire for {self.company_name or 'Unnamed Company'}"
 

class BusinessAssessment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assessments', null=True)  # Allow null temporarily
    name = models.CharField(max_length=255, default='Default Assessment')    
    description = models.TextField(blank=True)
    email = models.EmailField()
    full_name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    industry_niche = models.CharField(max_length=255)
    years_in_business = models.PositiveIntegerField(null=True, blank=True)  # Changed to IntegerField
    number_of_employees = models.PositiveIntegerField(null=True, blank=True) # Changed to IntegerField
    annual_revenue = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True) 
    geographic_locations = models.TextField(blank=True)
    
    # Current State
    main_products = models.TextField()
    current_performance = models.TextField()
    biggest_challenges = models.TextField()
    
    # Ideal State
    business_vision = models.TextField()
    primary_goals = models.TextField()
    success_indicators = models.TextField(blank=True)
    
    # Market Analysis
    market_research = models.TextField()
    target_customers = models.TextField()
    competitors = models.TextField()
    
    # Brand Identity
    current_brand_identity = models.TextField()
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
    brand_identity = models.TextField(blank=True, null=True)  # Add this
    business_description = models.TextField(blank=True, null=True) # Correct name
    main_competitors = models.TextField(blank=True, null=True) # Add this
    specific_outcomes = models.TextField(blank=True, null=True) 
    
    # Additional Information
    additional_info = models.TextField(blank=True)
    specific_questions = models.TextField(blank=True)
    
    # Analysis Results
    analysis_results = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"BusinessAssessment for {self.name} by {self.user.username}"  # More informative

    class Meta:
        ordering = ['-created_at']


class Report(models.Model):
    assessment = models.ForeignKey('BusinessAssessment', on_delete=models.CASCADE, related_name='reports')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  # Add created_at field
    updated_at = models.DateTimeField(auto_now=True)  # Add updated_at field

    def __str__(self):
        return f"Report for {self.assessment.name}"  # Improved __str__ method
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    company = models.CharField(max_length=255, default='Default Company')  # Required field with default
    website = models.URLField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)  # Add profile picture field
    # Add other fields as needed (e.g., phone number, social media links, etc.)

    def __str__(self):
        return f"Profile for {self.user.username}"