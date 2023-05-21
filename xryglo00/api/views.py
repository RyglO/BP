from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from api.util import *
from api.serializers import LoginSerializer
import json
# Create your views here.


def main(requst):
    return HttpResponse("<h1>Stránka pro API, TBD<h1>")

class LoginHandle(APIView):

    def post(self, request, format=None):
        dct = json.load(request)
        response = thingsboard_login(dct["email"], dct["password"])
        return Response(response)
        
class UsersHandle(APIView):

    def post(self, request, format=None):
        dct = json.load(request)
        response = getAllDevices(dct["token"], dct["LoggedUser"])
        
        return Response(response.json(), status=status.HTTP_200_OK)

#Asi zatím není třeba. Kdyby se loadoval customerID do paměti, tak lze využít na přímé načítání zařízení
class DevicesHandle(APIView): 

    def get(self, request, format=None):
        dct = json.load(request)
        response = thingsboard_GetDevices(JFTtoken, customerID) 
        return Response(response)

class ValuesHandle(APIView):

    def post(self, request, format=None):
        dct = json.load(request)
        response = thingsboard_GetValuesFromDevice(dct["token"], dct["DeviceID"], dct["startTS"], dct["endTS"], dct["keys"], dct["orderBy"], dct["interval"], dct["agg"])
        return Response(response.json(), status=status.HTTP_200_OK)

class CustomersHandle(APIView):
    def post(self, request, format=None):
        dct = json.load(request)
        response = thingsboard_GetAllUsersInCustomers(dct["token"], dct["customerID"], dct["sortProperty"], dct["order"])
        return Response(response.json(), status=status.HTTP_200_OK)

class UserInfoHandle(APIView):
    def post(self, request, format=None):
        dct = json.load(request)
        response = thingsboard_GetCurrentUserData(dct["token"])
        return Response(response.json(), status=status.HTTP_200_OK)

class DeviceUserLabel(APIView):
    def post(self, request, format=None):
        dct = json.load(request)
        response = None
        accessToken = request.headers.get('Authorization', '').split(' ')[-1]
        data = dct["data"]
        response = thingsboard_SetDeviceLabel(accessToken, data)
        print(response.json())
        return Response(response.json(), status=status.HTTP_200_OK)

class EditUserHandle(APIView):
    def post(self, request, format=None):
        dct = json.load(request)
        accessToken = request.headers.get('Authorization', '').split(' ')[-1]
        userdata = dct["userData"]
        response = thingsboard_AddEditUser(accessToken, userdata)
        return Response(response.json(), status=status.HTTP_200_OK)
    
class ChangePasswordHandle(APIView):
    def post(self, request, format=None):
        dct = json.load(request)
        accessToken = request.headers.get('Authorization', '').split(' ')[-1]
        userdata = dct
        response = thingsboard_ChangePasswordCurrentUser(accessToken, userdata)
        return Response(response.json(), status=status.HTTP_200_OK)

class GetDeviceStatusHandle(APIView):
    def post(self, request, format=None):
        dct = json.load(request)
        print(dct)
        accessToken = request.headers.get('Authorization', '').split(' ')[-1]
        response = thingsboard_GetDeviceStatus(accessToken, dct["deviceType"], dct["deviceID"])
        return Response(response.json())