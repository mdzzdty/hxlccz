from django.urls import path
from . import views,userView

urlpatterns = [
    path('index',views.index,name='index'),
    path('regirst',userView.regirst,name='regirst'),
]