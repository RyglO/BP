from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
# Create your views here.


def main(requst):
    return HttpResponse("<h1>Stránka pro API, TBD<h1>")

class CreteLoginView(APIView):
    serializer_class = LoginSerializer
    def post(self, request, format=None):
        pass