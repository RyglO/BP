from django.shortcuts import render
from rest_framework.views import APIView
from requests import Request, post, get
from rest_framework import status
from rest_framework.response import Response
import json

BASE_ADDRESS = "https://wattee.net/api/"

def thingsboard_login(email, password):
    response = post(BASE_ADDRESS+'auth/login',json={
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
    print(response)
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
    response = get(BASE_ADDRESS + 'user/users',headers = headers, params=parameters)
    return response

def thingsboard_GetDevices(JFTtoken, customerID):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JFTtoken}
    parameters = {
        "pageSize": "100",
        "page": "0",
    }
    response = get(BASE_ADDRESS + 'customer/' + customerID + '/devices', headers = headers, params=parameters)

    return response

def thingsboard_GetLastTSfromDevice(JFTtoken, deviceID):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JFTtoken}
    parameters = {
            'keys': 'counter',
    }
    response = get(BASE_ADDRESS + 'plugins/telemetry/DEVICE/'+deviceID+ '/values/attributes/CLIENT_SCOPE', headers = headers, params=parameters)
    return response

def thingsboard_GetValuesFromDevice(JFTtoken, deviceID, startTS, endTS, keys, order, interval, agregate):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JFTtoken}
    parameters = {
            'keys': keys,
            'startTs': startTS,
            'endTs': endTS,
            'interval': interval,
            'orderBy': order,
            'agg': agregate
    }
    response = get( BASE_ADDRESS + 'plugins/telemetry/DEVICE/'+deviceID+ '/values/timeseries', headers = headers, params=parameters)
    return response

def thingsboard_GetAllUsersInCustomers(JFTtoken, customerID, sort, order):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JFTtoken}
    parameters = {
        'pageSize': 100,
        'page': 0,
        'sortProperty': sort, 
        'orderBy': order
    }
    response = get(BASE_ADDRESS + 'customer/'+customerID+'/users', headers = headers, params=parameters)
    return response

def thingsboard_GetCurrentUserData(JWTtoken):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JWTtoken}
    response = get(BASE_ADDRESS + 'auth/user', headers=headers)
    return response

def thingsboard_SetDeviceLabel(JWTtoken, data):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JWTtoken}
    response = post(BASE_ADDRESS + 'device', json=data, headers=headers)
    return response

def thingsboard_AddEditUser(JWTtoken, data):
    print("JWT: "+ JWTtoken)
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JWTtoken}
    response = post(BASE_ADDRESS + 'user', json=data, headers=headers)
    return response

def thingsboard_ChangePasswordCurrentUser(JWTtoken, data):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JWTtoken}
    response = post(BASE_ADDRESS + 'auth/changePassword', json=data, headers=headers)
    return response

def thingsboard_GetDeviceStatus(JWTtoken, deviceType, deviceID):
    headers = {
        "Content-Type": "application/json;",
        "X-Authorization": "Bearer " + JWTtoken}
    parameters = {
        'keys': 'active'
    }
    response = get(BASE_ADDRESS+'plugins/telemetry/'+deviceType+'/'+deviceID+'/values/attributes/SERVER_SCOPE', headers = headers, params=parameters)
    print(response.json)
    return response