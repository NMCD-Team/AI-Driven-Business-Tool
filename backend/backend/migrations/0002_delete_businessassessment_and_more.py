# Generated by Django 5.1.7 on 2025-04-19 20:07

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0001_initial"),
    ]

    operations = [
        migrations.DeleteModel(
            name="BusinessAssessment",
        ),
        migrations.RemoveField(
            model_name="report",
            name="questionnaire",
        ),
        migrations.RemoveField(
            model_name="report",
            name="user",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="user",
        ),
        migrations.DeleteModel(
            name="Questionnaire",
        ),
        migrations.DeleteModel(
            name="Report",
        ),
        migrations.DeleteModel(
            name="UserProfile",
        ),
    ]
