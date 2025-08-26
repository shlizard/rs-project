from django.db import models

from backend.models import TimeStampedModel
from user.models import User

# Create your models here.


class Genre(TimeStampedModel):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Country(TimeStampedModel):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Movie(TimeStampedModel):
    name = models.CharField(max_length=50, unique=True)
    imdb = models.FloatField()
    image = models.ImageField(upload_to="api/images/", blank=True, null=True)
    genre = models.ManyToManyField(Genre)
    year = models.IntegerField()
    hour = models.IntegerField()
    minute = models.IntegerField()
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    age = models.IntegerField()
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Serie(TimeStampedModel):
    name = models.CharField(max_length=50)
    imdb = models.FloatField()
    image = models.ImageField(upload_to="api/images/", blank=True, null=True)
    genre = models.ManyToManyField(Genre)
    year = models.IntegerField()
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    age = models.IntegerField()
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Season(TimeStampedModel):
    season_number = models.IntegerField()
    serie = models.ForeignKey(Serie, related_name="seasons", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.serie} / فصل {self.season_number}"


class Chapter(TimeStampedModel):
    chapter_number = models.IntegerField()
    season = models.ForeignKey(
        Season, related_name="chapters", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.season} / قسمت {self.chapter_number}"


class MovieRating(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.FloatField()
    stars = models.IntegerField()
    isWatched = models.BooleanField()
    isBookmark = models.BooleanField()
    isFavorite = models.BooleanField()
    isLike = models.BooleanField()
    isDislike = models.BooleanField()

    class Meta:
        unique_together = (("user", "movie"),)

    def __str__(self):
        return f"{self.user.email} امتیاز {self.rating} به {self.movie.name} داد"


class SerieRating(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    serie = models.ForeignKey(Serie, on_delete=models.CASCADE)
    rating = models.FloatField()
    stars = models.IntegerField()
    isWatched = models.BooleanField()
    isBookmark = models.BooleanField()
    isFavorite = models.BooleanField()
    isLike = models.BooleanField()
    isDislike = models.BooleanField()

    class Meta:
        unique_together = (("user", "serie"),)

    def __str__(self):
        return f"{self.user.email} امتیاز {self.rating} به {self.serie.name} داد"
