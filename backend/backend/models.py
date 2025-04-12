from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Questionnaire(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Questionnaire by {self.user.username} on {self.submitted_at.strftime('%Y-%m-%d')}"

class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
    analysis = models.TextField()
    product_suggestions = models.TextField()
    growth_potential = models.TextField(null=True, blank=True)
    operation_insight = models.TextField(null=True, blank=True)
    strategic_recommendation = models.TextField(null=True, blank=True)
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report for {self.user.username} ({self.generated_at.strftime('%Y-%m-%d')})"

class BusinessAssessment(models.Model):
    email = models.EmailField()
    full_name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    industry_niche = models.CharField(max_length=255)
    years_in_business = models.CharField(max_length=50)
    number_of_employees = models.CharField(max_length=50)
    annual_revenue = models.CharField(max_length=100)
    geographic_locations = models.TextField(blank=True)

    def __str__(self):
        return f"{self.full_name} - {self.company_name}"
