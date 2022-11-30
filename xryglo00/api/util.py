from django.shortcuts import render
from rest_framework.views import APIView
from requests import Request, post, get
from rest_framework import status
from rest_framework.response import Response
import json


def thingsboard_login(email, password):
    response = post('https://wattee.net/api/auth/login',json={
        'username': email,
        'password': password
    }).json()
    print(response)
    return response

def getAllDevices(JFTtoken, userSearch):
    response = thingsboard_getUsers(JFTtoken, userSearch)
    data = json.loads(response.text)
    print(data)

    idTennant = None
    ids = data['data']

    if ids and isinstance(ids, list):
        for id in ids:
            idTennant = id['customerId'].get('id')
    #print(idTennant)
    response = thingsboard_GetDevices(JFTtoken, idTennant)
    #print(json.loads(response.text))
    return response



def thingsboard_getUsers(JFTtoken, userSearch):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JFTtoken}
    parameters = {
        "pageSize": "1",
        "page": "0",
        "textSearch": userSearch,
    }
    response = get('https://wattee.net/api/user/users',headers = headers, params=parameters)
    return response

def thingsboard_GetDevices(JFTtoken, customerID):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JFTtoken}
    parameters = {
        "pageSize": "10",
        "page": "0",
    }
    response = get('https://wattee.net/api/customer/' + customerID + '/devices', headers = headers, params=parameters)

    return response

def thingsboard_GetValuesFromDevice(JFTtoken, deviceID):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JFTtoken}
    parameters = {
        'keys': 'import_power, export_power',
            'startTs': 1666880863792,
            'endTs': 1666881063792, 

    }
    response = get('https://wattee.net/api/customer/' + customerID + '/devices', headers = headers, params=parameters)

    return response

    