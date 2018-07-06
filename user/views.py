from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

from django.http import HttpResponse
from django.http import HttpResponseRedirect
from .models import TUser

def index(request):
    return render(request, 'index.html', {})

def login(request):
    if request.method=='POST':
        username = request.POST.get("username")
        password = request.POST.get("password")

        if(username==''or password==''):
             return HttpResponseRedirect('login?mes=请输入账号或密码！')
        #模拟数据库查询操作
        #TUser.objects.get(username=username)
        
        #if username=='admin' and password=="123456":
        # if code!=request.session["code"]:
        #     return HttpResponseRedirect('login?mes=验证码不正确!')
        if TUser.objects.filter(username=username,password=password).exists()==True:
            #return HttpResponse('登录成功!')
            request.session["username"] = username
            return HttpResponseRedirect('/')
        else:    
            #return HttpResponse('登录失败!')
            
            return HttpResponseRedirect('login?mes=账号或密码错误!')
    else: 
        mes=""
        if request.GET.get('mes'):
            mes = request.GET.get('mes')   
        return render(request,'login.html',{'mes':mes})
def register(request):
    if request.method=='POST':
        username = request.POST.get("username")
        password = request.POST.get("password")

        if(username==''or password==''):
             return HttpResponseRedirect('register?mes=请输入账号或密码！')
        user = TUser()
        user.username=username
        user.password=password
        user.aiWinTime=0
        user.aiLoseTime=0
        user.pvpLoseTime=0
        user.pvpWinTime=0
        user.articlePic=""
        user.save()
        return HttpResponseRedirect('login?mes=注册成功 请登录！')
    else:
        mes=""
        if request.GET.get('mes'):
            mes = request.GET.get('mes')   
        return render(request,'register.html',{'mes':mes})