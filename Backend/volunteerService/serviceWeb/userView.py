from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login

from serviceWeb.functions import user
import random

def regirst(request):
    if (request.method == 'POST'):
        try:
            username = request.POST.get('username','')
            password = request.POST.get('password','')
            name = request.POST.get('name','')
            gender = request.POST.get('gender','')
            phone = request.POST.get('phone','')
            dept = request.POST.get('dept','')
            avatar = request.FILES.get('avatar')
            configDict = {
                'username': username,
                'password': password,
                'name': name,
                'gender': gender,
                'phone': phone,
                'dept': dept,
                'avatar': avatar,
            }
            if user.regirst(configDict):
                response = HttpResponse('successful')
                response.status_code = 200
                return response
            else:
                response = HttpResponse('error')
                response.status_code = 500
                return response
        except Exception as e:
            print(e)
            response = HttpResponse('error')
            response.status_code = 403
            return HttpResponse('error')
    else:
        response = HttpResponse('post only')
        response.status_code=500
        return response

def organRegirst(request):
    if (request.method == 'POST'):
        try:
            ran = str(random.randint(100000, 999999))
            username = request.POST.get('username','')
            password = request.POST.get('password','')
            name = request.POST.get('name','')
            phone = request.POST.get('phone','')
            avatar = request.FILES.get('avatar')
            configDict = {
                'username': username,
                'password': password,
                'name': name,
                'phone': phone,
                'avatar': avatar,
                'id': ran,
            }
            print(configDict)
            if user.organRegirst(configDict):
                response = HttpResponse("组织ID为："+ran)
                response.status_code = 200
                return response
            else:
                response = HttpResponse('error')
                response.status_code = 500
                return response
        except Exception as e:
            print(e)
            response = HttpResponse('error')
            response.status_code = 403
            return HttpResponse('error')
    else:
        response = HttpResponse('post only')
        response.status_code=500
        return response
