from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from thingsboardAPI import utils
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
        return Response(response)


#Asi zatím není třeba. Kdyby se loadoval customerID do paměti, tak lze využít na přímé načítání zařízení
class DevicesHandle(APIView): 

    def get(self, request, format=None):
        dct = json.load(request)
        response = thingsboard_GetDevices(JFTtoken, customerID) 
        return Response(response)

class ValuesHandle(APIView):

    def get(self, request, format=None):
        dct = json.load(request)
        repsonse = thingsboard_GetValuesFromDevice(JFTtoken, deviceID)

        return Response(repsonse)