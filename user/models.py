from django.db import models

# Create your models here.
class TUser(models.Model):
    userId = models.AutoField(primary_key=True,unique=True)#自增
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    aiWinTime = models.IntegerField()
    aiLoseTime = models.IntegerField()
    pvpWinTime = models.IntegerField()
    pvpLoseTime = models.IntegerField()
    articlePic = models.CharField(max_length=200)