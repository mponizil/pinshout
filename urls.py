from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'shouts.views.shout'),
    url(r'^shout$', 'shouts.views.shout'),
    
    url(r'^api/shouts/new$', 'shouts.api.new_shout'),
    url(r'^api/shouts/get$', 'shouts.api.get_shouts'),
    
    url(r'^admin/', include(admin.site.urls)),
)