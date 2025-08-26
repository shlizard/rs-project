import posixpath
from pathlib import Path

from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from django.http import HttpResponse
from django.utils._os import safe_join
from django.views.static import serve as static_serve
from django.conf.urls.static import static

from main.models import Movie
from . import settings


def response(massage, data={}, code=200):
    return Response(
        data={"data": data, "massage": massage},
        status=code,
    )


def serve_react(request, path, document_root=None):
    path = posixpath.normpath(path).lstrip("/")
    fullpath = Path(safe_join(document_root, path))
    if fullpath.is_file():
        return static_serve(request, path, document_root)
    else:
        return static_serve(request, "index.html", document_root)


class MultipleFieldLookupMixin:
    lookup_fields = []

    def get_object(self):
        queryset = self.get_queryset()
        filter_kwargs = {}
        for field in self.lookup_fields:
            if self.kwargs.get(field):
                filter_kwargs[field] = self.kwargs[field]
        obj = get_object_or_404(queryset, **filter_kwargs)
        self.check_object_permissions(self.request, obj)
        return obj
