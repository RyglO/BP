from django.shortcuts import render
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response


#class AuthURL(APIView):
    #def get(self, request, format=None):

        # url = Request('POST', 'https://wattee.net:443/api/auth/login', params
        # {
        #     "username": "prdat mrdel",
        #     "password": "prdat"
        # })

# def thingsboard_callback(request, format=None):
#     status_code = request.GET.get('status')
#     error = request.GET.get('message')
    

