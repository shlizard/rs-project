from django.shortcuts import render
from rest_framework import generics
from .serializers import Users_serializer
from .models import User
# Create your views here.


def main(request):
    pass


class Apiview(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = Users_serializer
