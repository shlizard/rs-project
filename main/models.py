from django.db import models

# Create your models here.


class Movie(models.Model):
    name = models.CharField(max_length=50)
    imdb = models.FloatField()
    genre = models.CharField(max_length=50)
    year = models.IntegerField()
    time = models.IntegerField()
    country = models.CharField(max_length=50)
    age = models.IntegerField()


class Serie(models.Model):
    name = models.CharField(max_length=50)
    imdb = models.FloatField()
    genre = models.CharField(max_length=50)
    year = models.IntegerField()
    country = models.CharField(max_length=50)
    age = models.IntegerField()
    season = models.IntegerField()
    chapter = models.IntegerField()
