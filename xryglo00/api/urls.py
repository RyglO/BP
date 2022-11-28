
from django.urls import path 
from .views import main, LoginHandle, UsersHandle, DevicesHandle

urlpatterns = [
    path('home', main),
    path('login', LoginHandle.as_view()),
    path('users', UsersHandle.as_view()),
    path('devices', DevicesHandle.as_view())

]