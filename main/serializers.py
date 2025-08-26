from rest_framework import serializers
from .models import (
    Movie,
    Serie,
    Genre,
    Country,
    Season,
    Chapter,
    MovieRating,
    SerieRating,
)


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


class ChapterSerializer(serializers.ModelSerializer):
    season = serializers.SlugRelatedField(
        slug_field="season_number", queryset=Season.objects.all()
    )

    class Meta:
        model = Chapter
        fields = "__all__"


class SeasonSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True, read_only=True)
    serie = serializers.SlugRelatedField(
        slug_field="name", queryset=Serie.objects.all()
    )

    class Meta:
        model = Season
        fields = "__all__"


class MovieSerializer(serializers.ModelSerializer):
    country = serializers.SlugRelatedField(
        slug_field="name", queryset=Country.objects.all()
    )
    genre = serializers.SlugRelatedField(
        many=True, slug_field="name", queryset=Genre.objects.all()
    )

    class Meta:
        model = Movie
        fields = "__all__"


class SerieSerializer(serializers.ModelSerializer):
    country = serializers.SlugRelatedField(
        slug_field="name", queryset=Country.objects.all()
    )
    genre = serializers.SlugRelatedField(
        many=True, slug_field="name", queryset=Genre.objects.all()
    )
    seasons = SeasonSerializer(many=True, read_only=True)

    class Meta:
        model = Serie
        fields = "__all__"


class MovieRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieRating
        fields = "__all__"


class SerieRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SerieRating
        fields = "__all__"
