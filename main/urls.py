from django.urls import path
from . import views
from django.urls import path, re_path
from django.conf import settings

urlpatterns = [
   path('',views.index),
   # re_path(r"^(?P<path>.*)$", views.serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),
]
