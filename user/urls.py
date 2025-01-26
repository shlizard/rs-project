from django.urls import path
from . import views
urlpatterns = [
    #path('login',views.login),
    path('api',views.Apiview.as_view())
]
