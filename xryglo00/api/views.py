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
    # email = 'email'
    # password = 'password'
    # serializer_class = LoginSerializer

    def post(self, request, format=None):
        dct = json.load(request)
        response = thingsboard_login(dct["email"], dct["password"])
        return Response(response)
        
        # if response.get('status') == None:
        #     #Response({'OK': 'Successfully Logged in.'}, status=status.HTTP_200_OK, data=response.get("token"))
        # elif response.get('code') == 401:
        #     return Response({'Unauthorized': 'User account is not active'}, status=status.HTTP_401_UNAUTHORIZED)

        # return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)  

class UsersHandle(APIView):

    def get(self, request, format=None):
        dct = json.load(request)
        response = thingsboard_getUsers(dct["JFTtoken"], dct["userSearch"]) #tbd podle api callu z frontendu
        return Response(response)

class DevicesHandle(APIView):

    def get(self, request, format=None):
        dct = json.load(request)
        response = thingsboard_GetDevices(JFTtoken, customerID) #tbd podle api callu z frontendu
        return Response(response)
