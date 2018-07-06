from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponseRedirect
#中间件
class loginMiddleWare(MiddlewareMixin):
        def process_request(self,request):
            if request.path!="/user/login":
                if not request.session.has_key("username") or not request.session["username"]:
                    return HttpResponseRedirect("/user/login")