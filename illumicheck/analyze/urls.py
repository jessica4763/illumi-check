from django.urls import path
from . import views

urlpatterns = [
    path('upload', views.upload, name='upload'),
    path('get_csrf_token', views.get_csrf_token, name='get_csrf_token')
]