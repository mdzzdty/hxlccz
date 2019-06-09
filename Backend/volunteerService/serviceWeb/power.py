from django.contrib.auth.models import User
from serviceWeb.models import UserProfile
from serviceWeb.models import OrganProfile

def is_organizer(user):
    p = User.objects.get(username=user)
    ID = p.id 
    try:
        user = OrganProfile.objects.get(user_id=ID)
        if user.role == 'o':
            return True
        else:
            return False
    except Exception as e:
        return False

def is_volunteer(user):
    p = User.objects.get(username=user)
    ID = p.id 
    try:
        user = UserProfile.objects.get(user=ID)
        if user.role == 's':
            return True
        else:
            return False
    except Exception as e:
        return False

def is_power(user):
    pass