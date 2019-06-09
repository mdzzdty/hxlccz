from django.db import models
from django.contrib.auth.models import User
# Create your models here.、

ROLE_CHOICES = (
    ('s','学生'),
    ('o','组织'),
    ('a','管理员'),
)


class UserProfile(models.Model):
    SEX_CHOICES = (
        ('f','女'),
        ('m','男'),
    )
    STATUS_CHOICES = (
        ('n','正常'),
        ('b','被拉黑'),
    )

    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    name = models.CharField(db_column='name',max_length=10)
    role = models.CharField(db_column='role',max_length=1,choices=ROLE_CHOICES,default=ROLE_CHOICES[0][0])
    gender = models.CharField(db_column='gender',max_length=1,choices=SEX_CHOICES,default=SEX_CHOICES[0][0])
    status = models.CharField(db_column='status',max_length=1,choices=STATUS_CHOICES,default=STATUS_CHOICES[0][0])
    phone = models.CharField(db_column='phone',max_length=18)
    dept = models.CharField(db_column='dept',max_length=30)
    timeAll = models.IntegerField(db_column='timeAll',default=0)
    avatar = models.ImageField(db_column='avatar',upload_to="static/image/UserAvatar",blank=True)
    reputation = models.IntegerField(db_column='reputation',default=100)
    def __str___(self):
        return self.name


class OrganProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    name = models.CharField(db_column='name',max_length=70)
    role = models.CharField(db_column='role',max_length=1,choices=ROLE_CHOICES,default=ROLE_CHOICES[1][0])
    phone = models.CharField(db_column='phone',max_length=18,default='')
    qq = models.CharField(db_column='qq',max_length=14,default='')
    wechat = models.CharField(db_column='wechat',max_length=30,default='')
    avatar = models.ImageField(db_column='avatar',upload_to='static/image/OrganAvatar',blank=True)
    reputation = models.IntegerField(db_column='reputation',default=100)
    def __str__(self):
        return self.name


class Managment(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    role = models.CharField(db_column='role',max_length=1,choices=ROLE_CHOICES,default=ROLE_CHOICES[2][0])
    

class Activity(models.Model):
    STATUS = (
        ('n','未审核'),
        ('o','已审核'),
        ('u','报名中'),
        ('i','进行中'),
        ('e','结束'),
    )
    ID = models.IntegerField(db_column='id',primary_key=True)
    name = models.CharField(db_column='name',max_length=70)
    activityTime = models.DateTimeField(db_column='activityTime')
    signStartTime = models.DateTimeField(db_column='signStartTime')
    signEndTime = models.DateTimeField(db_column='signEndTime')
    lastTime = models.IntegerField(db_column='lastTime')
    maxNumber = models.IntegerField(db_column='maxNumber')
    organ = models.ForeignKey(OrganProfile,on_delete=models.CASCADE)
    text = models.CharField(db_column='text',max_length=512)
    status = models.CharField(db_column='status',max_length=1,choices=STATUS,default=STATUS[0][0])
    number = models.IntegerField(db_column='number',default=0)
    avatar = models.ImageField(db_column='avatar',upload_to='static/image/Activity',blank=True)
    addr = models.CharField(db_column='addr',max_length=40)

    def __str__(self):
        return self.name


class Record(models.Model):
    STATUS = (
        ('n','已报名'),
        ('i','已参加'),
        ('e','时长已录入'),
        ('u','未参加'),
        ('y','取消报名'),
    )
    activity = models.ForeignKey(Activity,on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    status = models.CharField(db_column='status',max_length=1,choices=STATUS,default=STATUS[0][0])

    class Meta:
        unique_together = ('activity','user',)


class Ranking(models.Model):
    ID = models.IntegerField(db_column='ID',primary_key=True)
    user = models.ForeignKey(UserProfile,on_delete=models.CASCADE)

class Evaluation(models.Model):
    user = models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity,on_delete=models.CASCADE)
    grade = models.CharField(db_column='grade',max_length=1,default='5')
    comment = models.CharField(db_column='comment',max_length=1024,default='')

    class Meta:
        unique_together = ('user','activity')
