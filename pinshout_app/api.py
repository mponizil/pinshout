from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from pinshout_app.models import *

import json
from datetime import datetime

@csrf_exempt
@require_POST
def new_shout(request):
    lat = request.POST['lat']
    lng = request.POST['lng']
    author = request.POST['author']
    message = request.POST['message']
    
    shout = Shout(lat=lat,lng=lng,author=author,message=message)
    shout.save()
    
    response = {
        'author': author,
        'message': message
    }
    
    return HttpResponse(json.dumps(response))

def get_shouts(request):
    lat = float(request.GET['lat'])
    lng = float(request.GET['lng'])
    
    radius = 0.1

    lat_low = lat - radius
    lat_high = lat + radius
    lng_low = lng - radius
    lng_high = lng + radius
    
    shouts = Shout.objects.filter(lat__gte=lat_low,lat__lte=lat_high,lng__gte=lng_low,lng__lte=lng_high)[:100]
    
    response = []
    for shout in shouts:
        response.append({
            'date_created': shout.date_created.strftime("%Y-%m-%d %H:%M:%S"),
            'lat': str(shout.lat),
            'lng': str(shout.lng),
            'author': shout.author,
            'message': shout.message
        })
    
    return HttpResponse(json.dumps(response))