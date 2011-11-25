from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'pinshout_app.views.shout'),
    url(r'^shout$', 'pinshout_app.views.shout'),
    
    url(r'^api/shouts/new$', 'pinshout_app.api.new_shout'),
    url(r'^api/shouts/get$', 'pinshout_app.api.get_shouts'),
    
    url(r'^admin/', include(admin.site.urls)),
)