# accounts/models.py
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.db import models
from backend.models import TimeStampedModel


class UserManager(BaseUserManager):
    def _create_User(self, email, password, **extra_fields):
        if not email:
            raise ValueError("ایمیل باید وارد شود")
        if not password:
            raise ValueError("رمز عبور باید وارد شود")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault("is_superuser", False)
        return self._create_User(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        return self._create_User(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, TimeStampedModel):
    # username = models.CharField(max_length=20, unique=True, blank=True)
    email = models.EmailField(unique=True, max_length=40)
    first_name = models.CharField(max_length=20, blank=True)
    last_name = models.CharField(max_length=20, blank=True)

    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
