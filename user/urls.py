from django.urls import path
from . import views
urlpatterns = [
    path('',views.Apiview.as_view())
]
