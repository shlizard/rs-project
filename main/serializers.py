from rest_framework import serializers
from .models import Movie, Serie


class movie_serializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class serie_serializer(serializers.ModelSerializer):
    class Meta:
        model = Serie
        fields = '__all__'
