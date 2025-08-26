from django.contrib import admin
from .models import (
    Movie,
    Serie,
    Season,
    Chapter,
    Country,
    Genre,
    MovieRating,
    SerieRating,
)

# Register your models here.

admin.site.register(Movie)
admin.site.register(Serie)
admin.site.register(Season)
admin.site.register(Chapter)
admin.site.register(Genre)
admin.site.register(Country)
admin.site.register(MovieRating)
admin.site.register(SerieRating)
