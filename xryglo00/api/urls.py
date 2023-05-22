
from django.urls import path 
from .views import main, LoginHandle, UsersHandle, DevicesHandle, ValuesHandle, CustomersHandle, UserInfoHandle, DeviceUserLabel, EditUserHandle, CreateUserHandle, ChangePasswordHandle, GetDeviceStatusHandle

urlpatterns = [
    path('home', main),
    path('login', LoginHandle.as_view()),
    path('users', UsersHandle.as_view()),
    path('devices', DevicesHandle.as_view()),
    path('dataDevices', ValuesHandle.as_view()),
    path('customers', CustomersHandle.as_view()),
    path('userInfo', UserInfoHandle.as_view()),
    path('deviceLabel', DeviceUserLabel.as_view()),
    path('editUser', EditUserHandle.as_view()),
    path('createUser', CreateUserHandle.as_view()),
    path('changePassword', ChangePasswordHandle.as_view()),
    path('deviceStatus', GetDeviceStatusHandle.as_view())

]