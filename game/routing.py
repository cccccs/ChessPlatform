from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url(r'^ws/game/(?P<room_name>[^/]+)/$', consumers.ChatConsumer),
    # url(r'^ws/game/(?P<i,j>[^/]+)/$',consumers.ChessConsumer),
]