from rest_framework import serializers
from .models import Users


class Users_serializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
