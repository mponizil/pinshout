from django.db import models
from datetime import datetime

class Shout(models.Model):
    date_created = models.DateTimeField()
    lat = models.DecimalField(max_digits=10, decimal_places=7)
    lng = models.DecimalField(max_digits=10, decimal_places=7)
    author = models.CharField(max_length=20)
    message = models.TextField()
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        super(Shout, self).save()
    
    def __unicode__(self):
        return "%s: %s" % (self.author, self.message[:20])