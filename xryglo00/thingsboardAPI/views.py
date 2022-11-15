from django.shortcuts import render
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response


class AuthThingsboardUser():
    def get(self, request, format=None):

        url = Request('POST', 'https://wattee.net:443/api/auth/login', params=
        {
            "username": "prdat mrdel",
            "password": "prdat"
        }).prepare().url
        
        return Response({'url':url}, status=status.HTTP_200_OK)

def thingsboard_callback(request, format=None):
    status_code = request.GET.get('status')
    error = request.GET.get('message')

    response = post()
    

