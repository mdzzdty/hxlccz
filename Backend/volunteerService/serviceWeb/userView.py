from django.http import HttpResponse

from serviceWeb.functions import user

def regirst(request):
    if (request.method == 'POST'):
        try:
            username = request.POST['username']
            password = request.POST['password']
            name = request.POST['name']
            gender = request.POST['gender']
            phone = request.POST['phone']
            dept = request.POST['dept']
            avatar = request.POST['avatar']
            configDict = {
                'username': username,
                'password': password,
                'name': name,
                'gender': gender,
                'phone': phone,
                'dept': dept,
                'avatar': avatar,
            }
            user.regirst(configDict)
            return HttpResponse('successful')
        except Exception as e:
            print(e)
            return HttpResponse('error')
    else:
        return HttpResponse('post only')

