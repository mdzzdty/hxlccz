from django.urls import path
from . import views,userView

urlpatterns = [
    path('test',views.test,name='test'),
    path('index',views.index,name='index'),
    path('organIndex',views.organIndex,name='organIndex'),
    path('regirst',userView.regirst,name='regirst'),
    path('vLogin',views.userLogin,name='vLogin'),
    path('getAvatar',views.getAvatar,name='getAvatar'),
    path('organRegirst',userView.organRegirst,name='organRegirst'),
    path('pushActivity',views.pushActivity,name='pushActivity'),
    path('getActivityList',views.getActivityList,name='getActivityList'),
    path('activityRead',views.readMoreHtml,name='activityRead'),
    path('getMoreHtml',views.getMoreHtml,name='getMoreHtml'),
    path('readmore',views.readmore,name='readmore'),
    path('volunteer_main',views.user_main,name='usermain'),
    path('acceptActivity',views.acceptActivity,name='acceptActivity'),
    path('logout',views.lignout,name='logout'),
    path('attend',views.attend,name='attend'),
    path('organActivity',views.organActivity,name='organActivity'),
]