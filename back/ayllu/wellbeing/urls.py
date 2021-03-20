from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sampleQuestions/', views.getSampleQuestions, name='getSampleQuestions'),
    path('audio/', views.processAudio, name='processAudio'),
    path('answeredPoll/', views.processAnsweredPoll, name='processAnsweredPoll'),
]
