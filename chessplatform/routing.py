# mysite/routing.py
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from chat.consumers import ChatConsumer 
from game.consumers import GChatConsumer 
from game.consumers import GChessConsumer
from game.consumers import GStatusConsumer  
from django.conf.urls import url
#import chat.routing
application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            [
            url(r"^ws/chat/(?P<room_name>[^/]+)/$", ChatConsumer),
            url(r"^ws/game/pvp/chat/(?P<room_name>[^/]+)/$", GChatConsumer),
            url(r"^ws/game/pvp/chess/(?P<room_name>[^/]+)/$", GChessConsumer),
            url(r"^ws/game/pvp/status/(?P<room_name>[^/]+)/$", GStatusConsumer),
            # url(r"^ws/game/pvp/status/(?P<room_name>[^/]+)/$", HStatusConsumer),
            # url(r"^ws/game/pvp/status/(?P<room_name>[^/]+)/$", HStatusConsumer),
            ]
            # chat.routing.websocket_urlpatterns,
        )
    ),
})