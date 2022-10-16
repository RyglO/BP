from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def main(requst):
    return HttpResponse("<h1>sup bitch<h1>")