from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    path("movies/", views.MovieListApiView.as_view()),
    path("movies/ratings/", views.MovieRatingListApiView.as_view()),
    path(
        "movies/ratings/<int:movie>/<int:user>/",
        views.MovieRatingDetailApiView.as_view(),
    ),
    path("movies/<int:pk>/", views.MovieDetailApiView.as_view()),
    path("series/", views.SerieListApiView.as_view()),
    path("series/ratings/", views.SerieRatingListApiView.as_view()),
    path(
        "series/ratings/<int:serie>/<int:user>/",
        views.SerieRatingDetailApiView.as_view(),
    ),
    path("series/<int:pk>/", views.SerieDetailApiView.as_view()),
]
