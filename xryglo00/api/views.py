from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def main(requst):
    return HttpResponse("<h1>Stránka pro API, TBD<h1>")