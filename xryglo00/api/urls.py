
from django.urls import path 
from .views import main, LoginHandle

urlpatterns = [
    path('home', main),
    path('login', LoginHandle.as_view())
]