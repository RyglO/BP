
from django.urls import path 
from .views import main, LoginHandle, UsersHandle, DevicesHandle, ValuesHandle, CustomersHandle, UserInfoHandle

urlpatterns = [
    path('home', main),
    path('login', LoginHandle.as_view()),
    path('users', UsersHandle.as_view()),
    path('devices', DevicesHandle.as_view()),
    path('dataDevices', ValuesHandle.as_view()),
    path('customers', CustomersHandle.as_view()),
    path('userInfo', UserInfoHandle.as_view())

]