from django.urls import path
from . import views,userView

urlpatterns = [
    path('test',views.test,name='test'),
    path('index',views.index,name='index'),
    path('regirst',userView.regirst,name='regirst'),
    path('vLogin',views.userLogin,name='vLogin'),
    path('getAvatar',views.getAvatar,name='getAvatar'),
]