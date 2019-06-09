from .. import models
from django.contrib.auth.models import User
from serviceWeb import power
import json
import datetime

#重写内部类，使json能够序列化datetime类型
class DateEncoder(json.JSONEncoder):  
    def default(self, obj):  
        if isinstance(obj, datetime.datetime):  
            return obj.strftime('%Y-%m-%d %H:%M:%S')  
        else:  
            return json.JSONEncoder.default(self, obj) 

def regirst(configDict):
    try:
        username = configDict['username']
        password = configDict['password']
        name = configDict['name']
        gender = configDict['gender']
        phone = configDict['phone']
        dept = configDict['dept']
        avatar = configDict['avatar']
        registAdd = User.objects.create_user(username=username,password=password)
        userRegirst = models.UserProfile()
        userRegirst.user = registAdd
        userRegirst.name = name
        userRegirst.gender = gender
        userRegirst.phone = phone
        userRegirst.dept = dept
        userRegirst.avatar = avatar
        userRegirst.save()
        return True
    except Exception as e:
        print(e)
        return False

def organRegirst(configDict):
    try:
        username = configDict['id']
        password = configDict['password']
        name = configDict['name']
        phone = configDict['phone']
        avatar = configDict['avatar']
        registAdd = User.objects.create_user(username=username,password=password)
        userRegirst = models.OrganProfile()
        userRegirst.user = registAdd
        userRegirst.name = name
        userRegirst.phone = phone
        userRegirst.avatar = avatar
        userRegirst.save()
        return True
    except Exception as e:
        print(e)
        return False


def activityPush(configDict):
    try:
        activityId = configDict['id']
        name = configDict['name']
        avatar = configDict['avatar']
        startTime = configDict['actime']
        putStartTime = configDict['statime']
        putEndTime = configDict['endtime']
        lastTime = configDict['lastTime']
        maxNumber = configDict['maxNumber']
        addr = configDict['addr']
        userID = configDict['organId']
        text = configDict['actintro']

        organ = models.OrganProfile.objects.get(user_id=userID)

        activity = models.Activity()

        activity.name = name
        activity.ID = activityId
        activity.avatar = avatar
        activity.signStartTime = putStartTime
        activity.signEndTime = putEndTime
        activity.activityTime = startTime
        activity.lastTime = lastTime
        activity.maxNumber = maxNumber
        activity.addr = addr
        activity.organ = organ
        activity.text = text
        activity.status = 'n'
        activity.number = 0
        activity.save()
        return True
    except Exception as e:
        print(e)
        return False
        
def avatarGet(user):
    p = User.objects.get(username=user)
    ID = p.id
    if power.is_volunteer:
        user = models.UserProfile.objects.get(user=ID)
        return "/"+user.avatar.url

def activityList(page,status):
    try:
        actDict = {}
        actList = []
        items = models.Activity.objects.filter(status=status)
        num = len(items)
        page = int(page)
        items = items[(page-1)*8:page*8]
        if num%8==0:
            pages = num/8
        else:
            temp = num%8
            pages = (num-temp)/8+1
        for item in items:
            itemDict = {
                'name': item.name,
                'activityTime': item.activityTime,
                'avatar': "/"+item.avatar.url,
                'id': item.ID,
            }
            actList.append(itemDict)
        actDict.update({'pageNum':page})
        actDict.update({'total':num})
        actDict.update({'pages': pages})
        actDict.update({'list':actList})
        if pages==page:
            hasNextPage=False
        else:
            hasNextPage=True
        actDict.update({'hasNextPage':hasNextPage})
        return json.dumps(actDict,cls=DateEncoder,ensure_ascii=False)
    except Exception as e:
        print(e)
        return False

def organActivityDict(page,status,user):
    try:
        actDict = {}
        actList = []
        use = User.objects.get(username=user)
        organ = models.OrganProfile.objects.get(user=use)
        items = models.Activity.objects.filter(status=status,organ=organ)
        num = len(items)
        page = int(page)
        items = items[(page-1)*8:page*8]
        if num%8==0:
            pages = num/8
        else:
            temp = num%8
            pages = (num-temp)/8+1
        for item in items:
            itemDict = {
                'name': item.name,
                'activityTime': item.activityTime,
                'avatar': "/"+item.avatar.url,
                'id': item.ID,
            }
            actList.append(itemDict)
        actDict.update({'pageNum':page})
        actDict.update({'total':num})
        actDict.update({'pages': pages})
        actDict.update({'list':actList})
        if pages<=page:
            hasNextPage=False
        else:
            hasNextPage=True
        actDict.update({'hasNextPage':hasNextPage})
        return json.dumps(actDict,cls=DateEncoder,ensure_ascii=False)
    except Exception as e:
        print(e)
        return False

def getMore(ID):
    try:
        p = models.Activity.objects.get(ID=ID)
        data = {}
        data.update({'name':p.name})
        data.update({'activityTime':p.activityTime})
        data.update({'signStartTime':p.signStartTime})
        data.update({'signEndTime':p.signEndTime})
        data.update({'lastTime':p.lastTime})
        data.update({'maxNumber':p.maxNumber})
        data.update({'text':p.text})
        data.update({'status':p.status})
        data.update({'number':p.number})
        data.update({'id':p.ID})
        data.update({'avatar': '/'+p.avatar.url})
        print(data)
        organ = p.organ
        name = organ.name
        data.update({'organName':name})
        return json.dumps(data,cls=DateEncoder,ensure_ascii=False)
        
    except Exception as e:
        print(e)
        return False

def acAct(actID):
    try:
        ac = models.Activity.objects.get(ID=actID)
        ac.status='o'
        ac.save()
        return True
    except Exception as e:
        print(e)
        print('error')
        return False

def actUpdata(actID,username):
    try:
        ac = models.Activity.objects.get(ID=actID)
        userobj = User.objects.get(username=username)
        now = datetime.datetime.now()
        if now < ac.signStartTime.replace(tzinfo=None):
            return "还没开始报名呢"
        if now > ac.signEndTime.replace(tzinfo=None):
            return "报名结束了呢"
        if ac.number >= ac.maxNumber:
            return "人数满了"
        ac.number = ac.number+1
        try:
            re = models.Record.objects.filter(activity=ac,user=userobj)
            if len(re) == 0:
                record = models.Record()
                record.user = userobj
                ac.save()
                record.activity = ac
                record.status = 'n'
                record.save()
                return "报名成功！"
            else:
                return "您已经报名了哦"
        except Exception as e:
            print(e)
            return "系统出错了呢"
    except Exception as e:
        print(e)
        return False


def test():
    with open('./test.jpeg') as f:
        configDict = {
            'username':'123',
            'password':'test',
            'name':'ccz',
            'gender':'f',
            'phone':'123456789',
            'dept':'计算机科学与技术',
            'avatar':f
        }
        regirst(configDict)
