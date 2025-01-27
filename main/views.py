from django.shortcuts import render
import posixpath
from pathlib import Path
from django.utils._os import safe_join
from django.views.static import serve as static_serve
# Create your views here.

def index(request):
    return render(request,'main/index.html')

def serve_react(request, path, document_root=None):
    path = posixpath.normpath(path).lstrip("/")
    fullpath = Path(safe_join(document_root, path))
    if fullpath.is_file():
        return static_serve(request, path, document_root)
    else:
        return static_serve(request, "index.html", document_root)
 