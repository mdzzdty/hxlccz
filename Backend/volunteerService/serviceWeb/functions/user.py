from .. import models
from django.contrib.auth.models import User

def regirst(configDict):
    email = ''
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
