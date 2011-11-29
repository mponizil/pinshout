from django.http import HttpResponse
from django.shortcuts import render_to_response

def shout(request):
    return render_to_response("shout.html")