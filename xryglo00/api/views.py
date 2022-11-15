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

# class CreteLoginView(APIView):
#     serializer_class = LoginSerializer
#     def post(self, request, format=None):
#         pass
class LoginHandle(APIView):
    email = 'email'
    password = 'password'
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        #code = request.GET.get(self.lookup_url_kwarg)

        dct = json.load(request)

        response = thingsboard_login(dct["email"], dct["password"])
        if response.get('status') == 200:
            return Response({'OK': 'Successfully Logged in.'}, status=status.HTTP_200_OK)
        elif response.get('status') == 401:
            return Response({'Unauthorized': 'User account is not active'}, status=status.HTTP_401_UNAUTHORIZED)



        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)  
