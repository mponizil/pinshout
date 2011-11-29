from django.db import models
from datetime import datetime

class Shout(models.Model):
    lat = models.DecimalField(max_digits=10, decimal_places=7)
    lng = models.DecimalField(max_digits=10, decimal_places=7)
    author = models.CharField(max_length=20)
    message = models.TextField()
    
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    
    def __unicode__(self):
        return "%s: %s" % (self.author, self.message[:20])