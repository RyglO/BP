from django.shortcuts import render
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response


def thingsboard_login(email, password):
    response = post('https://wattee.net/api/auth/login',json={
        'username': email,
        'password': password
    }).json()
    print(response)
    return response

def thingsboard_getUsers(JFTtoken, userSearch):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JFTtoken}
    parameters = {
        "pageSize": "10",
        "page": "0",
        "textSearch": userSearch,
    }
    response = get('https://wattee.net/api/users',headers = headers, params=parameters)


def thingsboard_GetDevices(JFTtoken, customerID):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JFTtoken}
    parameters = {
        "pageSize": "10",
        "page": "0",
    }
    response = get('https://wattee.net/api/customer/' + customerID + '/devices', headers = headers, params=parameters)

    