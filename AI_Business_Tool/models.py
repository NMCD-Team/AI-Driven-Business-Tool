from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Questionnaire(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)

class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
    analysis = models.TextField()
    product_suggestions = models.TextField()
    generated_at = models.DateTimeField(auto_now_add=True)

