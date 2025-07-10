from django.shortcuts import render
from rest_framework import generics
from .serializers import movie_serializer,serie_serializer
from .models import Movie,Serie
# Create your views here.

class MovieApiView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = movie_serializer

class SerieApiView(generics.ListCreateAPIView):
    queryset = Serie.objects.all()
    serializer_class = serie_serializer