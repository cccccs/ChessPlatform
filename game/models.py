from django.db import models
from user.models import TUser
# Create your models here.

class TRoom(models.Model):
    roomId = models.AutoField(primary_key=True,unique=True)#自增
    roomSetId = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    personNum = models.IntegerField(default=0)
    firstpersonId = models.CharField(max_length=50,null=True)
    secondpersonId = models.CharField(max_length=50,null=True)

class hallPlayer(models.Model):
    playerId = models.AutoField(primary_key=True,unique=True)
    hallplayer = models.OneToOneField(TUser,on_delete=models.CASCADE)
    roomplayerId = models.CharField(max_length=50)

class PlayerResult(models.Model):
    resultId = models.AutoField(primary_key=True,unique=True)#自增
    userId = models.CharField(max_length=50)
    opuserId = models.CharField(max_length=50)
    result = models.CharField(max_length=50)
    dateCreated = models.CharField(max_length=50)
    