from django.shortcuts import render
from django.utils.safestring import mark_safe
import json
from user.models import TUser
from django.http import HttpResponseRedirect,HttpResponse
from .models import TRoom,hallPlayer,PlayerResult
from django.views.decorators.csrf import csrf_exempt

import time,random,datetime
from django.db import IntegrityError
# Create your views here.
def index(request):
    return render(request,'index.html',{})

def ai(request):
    return render(request,'aisystem.html',{})

def room(request, room_name):
    if TRoom.objects.filter(roomSetId=room_name).exists()==True:
        room = TRoom.objects.get(roomSetId=room_name)
        request.session["type"] = "false"
        room.secondpersonId=request.session['username']
        request.session["opusername"] = TRoom.objects.get(roomSetId=room_name).firstpersonId
        room.personNum=2
        print("有"+room.secondpersonId)
        room.save()
    else:
        request.session["type"] = "true"

        room=TRoom()
        room.roomSetId=room_name
        room.password='0'
        room.firstpersonId=request.session['username']
        request.session["opusername"]=""
        room.personNum=1
        print("无"+room.firstpersonId)
        room.save()

    return render(request, 'pvp.html', {
        'room_name_json': mark_safe( json.dumps(room_name) )
    })

def randompvp(request):
    players= hallPlayer.objects.all()
    if players.count()!=0:
        try:
            e=list(players)
            user_obj = TUser.objects.get(username=request.session["username"])
            room_name=e[players.count()-1].roomplayerId
            hallPlayer.objects.create(hallplayer = user_obj,roomplayerId=room_name)

            time.sleep(1)
            hallPlayer.objects.filter(roomplayerId=room_name).delete()
            print("finish")
            return HttpResponseRedirect('../pvp/'+room_name+'/')
        except IntegrityError:
            e=list(players)
            room_name=e[players.count()-1].roomplayerId
            hallPlayer.objects.filter(roomplayerId=room_name).delete()
            
            user_obj = TUser.objects.get(username=request.session["username"])
            room_name=str(int(time.time()))+str(random.randrange(0,1000))
            hallPlayer.objects.create(hallplayer = user_obj,roomplayerId=room_name)
            c=1
            while(1):
                players= hallPlayer.objects.all()
                print(c)
                c=c+1
                if players.count()==2:
                    break

            
    
            return HttpResponseRedirect('../pvp/'+room_name+'/')    

        # return  render(request, 'pvp.html', {
        #     'room_name_json': mark_safe( json.dumps(room_name) )
        # })
    else:
        user_obj = TUser.objects.get(username=request.session["username"])
        room_name=str(int(time.time()))+str(random.randrange(0,1000))
        hallPlayer.objects.create(hallplayer = user_obj,roomplayerId=room_name)
        c=1
        while(1):
            players= hallPlayer.objects.all()
            print(c)
            c=c+1
            if players.count()==2:
                break

    
        return HttpResponseRedirect('../pvp/'+room_name+'/')    
        # return  render(request, 'pvp.html', {
        #     'room_name_json': mark_safe( json.dumps(room_name) )
        # })
def myresult(request):
    results = PlayerResult.objects.filter(userId=request.session['username'])
    return render(request,'myresult.html',{'results':results})



@csrf_exempt 
def saveresult(request):
    if request.method == "POST":
        result = PlayerResult()
        result.userId=request.session["username"]
        result.opuserId=request.POST.get("opname")
        result.result=request.POST.get('result')
        result.dateCreated=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')   
        result.save()
        return HttpResponse({'result':'success'})
