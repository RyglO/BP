from django.shortcuts import render
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response


def thingsboard_login(email, password):
    response = post('https://wattee.net/api/auth/login',data={
        'username': email,
        'password': password
    }).json()
    print(response)
    return response