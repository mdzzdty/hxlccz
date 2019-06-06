from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login

from serviceWeb.power import is_organizer,is_volunteer
from serviceWeb.functions import user

def index(request):
    template = loader.get_template('serviceWeb/mainpage.html')
    return HttpResponse(template.render())
# Create your views here.

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
    print(type(url))
    return HttpResponse(url)

def pushActivity(request):
    pass


