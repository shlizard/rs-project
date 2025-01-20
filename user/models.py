from django.db import models

# Create your models here.


class Users(models.Model):
    user_name = models.CharField(max_length=15)
    user_email = models.CharField(max_length=30)
    user_password = models.CharField(max_length=20)
