import pandas as pd

from rest_framework import generics, mixins

from .serializers import (
    MovieSerializer,
    SerieSerializer,
    MovieRatingSerializer,
    SerieRatingSerializer,
)
from .models import Movie, Serie, Country, Genre, MovieRating, SerieRating
from backend.views import MultipleFieldLookupMixin


class MovieListApiView(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        queryset = Movie.objects.all()
        movies = pd.read_csv("data/movies.csv")

        genre = request.data.getlist("genre")[0]
        if len(request.data.getlist("genre")) > 1:
            for g in request.data.getlist("genre")[1:]:
                genre += " | " + g

        movies = pd.concat(
            [
                movies,
                pd.DataFrame(
                    [
                        {
                            "movieId": queryset[len(queryset) - 1].pk,
                            "name": request.data.get("name"),
                            "genre": genre,
                        }
                    ]
                ),
            ],
            ignore_index=True,
        )
        movies.to_csv("data/movies.csv", index=False)
        return self.create(request, *args, **kwargs)


class MovieDetailApiView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    lookup_field = "pk"

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class MovieRatingListApiView(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):
    queryset = MovieRating.objects.all()
    serializer_class = MovieRatingSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        ratings = pd.read_csv("data/movieRatings.csv")

        ratings = pd.concat(
            [
                ratings,
                pd.DataFrame(
                    [
                        {
                            "userId": request.data.get("user"),
                            "movieId": request.data.get("movie"),
                            "ratings": request.data.get("rating"),
                        }
                    ]
                ),
            ],
            ignore_index=True,
        )
        ratings.to_csv("data/movieRatings.csv", index=False)

        return self.create(request, *args, **kwargs)


class MovieRatingDetailApiView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    MultipleFieldLookupMixin,
    generics.GenericAPIView,
):
    queryset = MovieRating.objects.all()
    serializer_class = MovieRatingSerializer
    lookup_fields = ["movie", "user"]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, movie, user, *args, **kwargs):
        ratings = pd.read_csv("data/movieRatings.csv")

        ratings.loc[
            (ratings["userId"] == user) & (ratings["movieId"] == movie), "ratings"
        ] = request.data.get("rating")
        ratings.to_csv("data/ratings.csv", index=False)

        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class SerieListApiView(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):
    queryset = Serie.objects.all()
    serializer_class = SerieSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        queryset = Movie.objects.all()
        series = pd.read_csv("data/series.csv")

        genre = request.data.getlist("genre")[0]
        if len(request.data.getlist("genre")) > 1:
            for g in request.data.getlist("genre")[1:]:
                genre += " | " + g

        series = pd.concat(
            [
                series,
                pd.DataFrame(
                    [
                        {
                            "serieId": queryset[len(queryset) - 1].pk,
                            "name": request.data.get("name"),
                            "genre": genre,
                        }
                    ]
                ),
            ],
            ignore_index=True,
        )
        series.to_csv("data/series.csv", index=False)
        return self.create(request, *args, **kwargs)


class SerieDetailApiView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    queryset = Serie.objects.all()
    serializer_class = SerieSerializer
    lookup_field = "pk"

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class SerieRatingListApiView(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):
    queryset = SerieRating.objects.all()
    serializer_class = SerieRatingSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        ratings = pd.read_csv("data/serieRatings.csv")

        ratings = pd.concat(
            [
                ratings,
                pd.DataFrame(
                    [
                        {
                            "userId": request.data.get("user"),
                            "serieId": request.data.get("serie"),
                            "ratings": request.data.get("rating"),
                        }
                    ]
                ),
            ],
            ignore_index=True,
        )
        ratings.to_csv("data/serieRatings.csv", index=False)

        return self.create(request, *args, **kwargs)


class SerieRatingDetailApiView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    MultipleFieldLookupMixin,
    generics.GenericAPIView,
):
    queryset = SerieRating.objects.all()
    serializer_class = SerieRatingSerializer
    lookup_fields = ["serie", "user"]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, serie, user, *args, **kwargs):
        ratings = pd.read_csv("data/serieRatings.csv")

        ratings.loc[
            (ratings["userId"] == user) & (ratings["serieId"] == serie), "ratings"
        ] = request.data.get("rating")
        ratings.to_csv("data/serieRatings.csv", index=False)

        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
