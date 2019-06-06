from django.contrib.auth.models import User
from serviceWeb.models import UserProfile

def is_organizer(user):
    p = User.objects.get(username=user)
    ID = p.id 
    user = UserProfile.objects.get(user_id=ID)
    if use.role == 'o':
        return True
    else:
        return False

def is_admin(user):
    p = User.objects.get(username=user)
    ID = p.id 
    user = UserProfile.objects.get(user=ID)
    if user.role == 's':
        return True
    else:
        return False

def is_volunteer(user):
    p = User.objects.get(username=user)
    ID = p.id 
    user = UserProfile.objects.get(user=ID)
    if user.role == 's':
        return True
    else:
        return False

def is_power(user):
    pass