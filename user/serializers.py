from rest_framework import serializers
from django.contrib.auth import password_validation as validators
from rest_framework import exceptions

from .models import User


class UserSerializer(serializers.ModelSerializer):
    token = serializers.CharField(default="")

    class Meta:
        model = User
        fields = ["email", "password", "token", "id"]
        extra_kwargs = {"password": {"write_only": True}}

    def to_representation(self, instance):

        representation = super().to_representation(instance)

        if self.parent and getattr(self.parent, "many", True):
            representation.pop("token", None)

        return representation

    def validate(self, data):
        password = data.get("password")
        user = User(email=data.get("email"), password=password)

        try:
            validators.validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        return data
