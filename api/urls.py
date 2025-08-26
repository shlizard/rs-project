from django.urls import path, include, re_path
from backend import settings
from django.conf.urls.static import static

from django.views.static import serve

urlpatterns = [
    path("users/", include("user.urls")),
    path("", include("main.urls")),
    re_path(r"^(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
]