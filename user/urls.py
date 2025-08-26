from django.urls import path
from .views import UserViewSet

urlpatterns = [
    path("register/", UserViewSet.as_view({"post": "register"})),
    path("login/", UserViewSet.as_view({"post": "login"})),
    path("me/", UserViewSet.as_view({"get": "user"})),
    path("", UserViewSet.as_view({"get": "users"})),
]
