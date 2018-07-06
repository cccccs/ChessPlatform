from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns =[
    path('',views.index,name='index'),
    path('ai/', views.ai),
    path('randompvp/',views.randompvp),
    path('saveresult/',views.saveresult),
    path('myresult/',views.myresult),
    url(r'^pvp/(?P<room_name>[^/]+)/$', views.room, name='room'),
    #url(r'^(?P<room_name>[^/]+)/$', views.room, name='room'),
]