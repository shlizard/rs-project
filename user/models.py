# accounts/models.py
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager
from django.db import models


class User(AbstractUser,PermissionsMixin):
    username = models.CharField(max_length=100)
    email = models.EmailField(db_index=True, unique=True,max_length=255)
    first_name = models.CharField(max_length=240)
    last_name = models.CharField(max_length=240)

    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name','username','is_staff']

    
