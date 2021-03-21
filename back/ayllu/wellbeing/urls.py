from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sampleQuestions/', views.getSampleQuestions, name='getSampleQuestions'),
    path('audio/', views.processAudio, name='processAudio'),
    path('answeredPoll/', views.processAnsweredPoll, name='processAnsweredPoll'),
    path('createUser/', views.createUser, name='createUser'),
    path('authenticateUser/', views.authenticateUsr, name='authenticateUser'),
    path('getUserResults/', views.getUserResults, name='getUserResults'),
]
