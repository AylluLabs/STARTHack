from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("hello world")

def getSampleQuestions(request):
    # TODO
    return HttpResponse('GetSampleQuestions')

def processAudio(request):
    # TODO
    return HttpResponse('sendAudio')

def processAnsweredPoll(request):
    # TODO
    return HttpResponse('processAnsweredPoll')