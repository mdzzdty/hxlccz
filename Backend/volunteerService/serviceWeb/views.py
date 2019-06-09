from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login,logout
from django.contrib.auth.models import User

from serviceWeb.power import is_organizer,is_volunteer
from serviceWeb.functions import user
import random

RMDICT = {}

def index(request):
    template = loader.get_template('serviceWeb/mainpage.html')
    return HttpResponse(template.render())

def organIndex(request):
    if not request.user.is_authenticated:
        template = loader.get_template('serviceWeb/mainpage.html')
        return HttpResponse(template.render())
    if is_organizer(request.user):
        template = loader.get_template('serviceWeb/organizer.html')
        return HttpResponse(template.render())
    else:
        return HttpResponse('you are not organ')

def user_main(request):
    if not request.user.is_authenticated:
        template = loader.get_template('serviceWeb/mainpage.html')
        return HttpResponse(template.render())
    if is_organizer(request.user):
        template = loader.get_template('serviceWeb/organizer.html')
        return HttpResponse(template.render())
    if is_volunteer(request.user):
        template = loader.get_template('serviceWeb/mainpage_volunteer.html')
        return HttpResponse(template.render())
    template = loader.get_template('serviceWeb/manger.html')
    return HttpResponse(template.render())

def userLogin(request):
    if (request.method=='POST'):
        try:
            userName = request.POST.get('username','')
            passWord = request.POST.get('password','')
        except Exception as e:
            response = HttpResponse('parameter error')
            response.status_code = 403
            return response
        user = authenticate(request,username=userName,password=passWord)
        if user is not None:
            login(request,user)
            if is_volunteer(user):
                return HttpResponse('volunteer login')
            if is_organizer(user):
                return HttpResponse('organizer login')
            return HttpResponse('login success!')
        else:
            response = HttpResponse('login fail')
            response.status_code = 403
            return response
    else:
        response = HttpResponse('your login fail!')
        response.status_code = 403
        return response

def test(request):
    print(request.user)
    return HttpResponse('skdjf')

def getAvatar(request):
    if not request.user.is_authenticated:
        return HttpResponse('you are not root')
    url=user.avatarGet(request.user)
    return HttpResponse(url)

def getActivityList(request):
    try:
        page = request.POST['page']
        status = request.POST['status']
        print(status)
        if status in 'ou':
            dictList = user.activityList(page,status)
        elif status in 'ie':
            if not request.user.is_authenticated:
                return HttpResponse('you need login')
            dictList = user.activityList(page,status)
        elif status in 'n':
            if not request.user.is_authenticated:
                print('not login')
                return HttpResponse('you need login')
            if is_organizer(request.user) or is_volunteer(request.user):
                print('a good')
                return HttpResponse('you are not manager')
            dictList = user.activityList(page,status)
        else:
            return HttpResponse('param error')
        print(dictList)
        if dictList == False:
            return HttpResponse('error')
        return HttpResponse(dictList)
    except Exception as e:
        print(e)
        print('------------')
        return HttpResponse('system error')

def acceptActivity(request):
    if not request.user.is_authenticated:
        return HttpResponse("you need login")
    if is_organizer(request.user) or is_volunteer(request.user):
        return HttpResponse("you are not manager")
    try:
        ID = request.POST['id']
        print(ID)
        flag = user.acAct(ID)
        if flag==True:
            return HttpResponse('success')
        return HttpResponse('error')
    except Exception as e:
        print(e)
        return HttpResponse('param error')
    

def readMoreHtml(request):
    if not request.user.is_authenticated:
        return HttpResponse("you need login")
    try:
        activityId = request.POST['id']
        RMDICT.update({str(request.user):activityId})
        return HttpResponse("success")
    except Exception as e:
        print(e+'skdfls')
        return HttpResponse("error")

def getMoreHtml(request):
    if not request.user.is_authenticated:
        return HttpResponse("you need login")
    try:
        if is_volunteer(request.user):
            template = loader.get_template('serviceWeb/volunteer-readmore.html')
            return HttpResponse(template.render())
        if is_organizer(request.user):
            template = loader.get_template('serviceWeb/organizer-readmore.html')
            return HttpResponse(template.render())
        template = loader.get_template('serviceWeb/manger-reamore.html')
        return HttpResponse(template.render())
    except Exception as e:
        print(e+'skdfls')
        return HttpResponse("error")


def readmore(request):
    if not request.user.is_authenticated:
        return HttpResponse("you need login")
    try:
        ID = RMDICT[str(request.user)]
        print(ID)
        data = user.getMore(ID)
        return HttpResponse(data)
    except Exception as e:
        print(e)
        return HttpResponse('system error')

def lignout(request):
    if request.method == 'GET':
        logout(request)
        return HttpResponse("登出成功")

def attend(request):
    if not request.user.is_authenticated:
        return HttpResponse("you need login")
    if is_volunteer(request.user):
        ID = request.POST['id']
        data = user.actUpdata(ID,request.user)
        return HttpResponse(data)
    else:
        return HttpResponse("you are not a volunteer")

def organActivity(request):
    if not request.user.is_authenticated:
        return HttpResponse("you need login")
    if is_organizer(request.user):
        try:
            pn = request.POST['page']
            status = request.POST['status']
            print(pn)
            print(status)
            data = user.organActivityDict(pn,status,request.user)
            print(data)
            if data==False:
                return HttpResponse("system error")
            return HttpResponse(data)
        except Exception as e:
            print(e)
            return HttpResponse("param error")
    else:
        return HttpResponse('you are not organ')

def pushActivity(request):
    if not request.user.is_authenticated:
        return HttpResponse("you need login")
    if (request.method=='POST'):
        try:
            if is_organizer(request.user):
                ID = str(random.randint(100000, 999999))
                name = request.POST['name']
                maxNumber = request.POST['maxNumber']
                actime = request.POST['actime']
                statime = request.POST['statime']
                endtime = request.POST['endtime']
                lastTime = request.POST['lastTime']
                addr = request.POST['addr']
                avatar = request.FILES.get('avatar')
                actintro = request.POST['actintro']
                userID = User.objects.get(username=request.user)

                if user.activityPush(
                    {
                        'id': ID,
                        'name':name,
                        'maxNumber':maxNumber,
                        'actime': actime,
                        'statime':statime,
                        'endtime':endtime,
                        'lastTime':lastTime,
                        'addr':addr,
                        'avatar':avatar,
                        'actintro':actintro,
                        'organId':userID,
                    },
                ):
                    return HttpResponse('success')
                return HttpResponse('error')
        except Exception as e:
            print(e)
            return HttpResponse('post error')


