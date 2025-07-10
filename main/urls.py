from django.urls import path
from . import views
urlpatterns = [
    path('movie',views.MovieApiView.as_view()),
    path('serie',views.SerieApiView.as_view()),
]
