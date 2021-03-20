from django.http import HttpResponse, JsonResponse
import numpy as np
from .models import WellbeingQuestion
import json
from django.forms.models import model_to_dict

# Create your views here.
def index(request):
    return HttpResponse("hello world")


def getSampleQuestions(request):
    questions = WellbeingQuestion.objects.all()
    sample = np.random.choice(questions, 3)
    sample = [model_to_dict(x) for x in sample]

    return HttpResponse(json.dumps({"data": list(sample)}))


def processAudio(request):
    # TODO
    return HttpResponse('sendAudio')


def processAnsweredPoll(request):
    # TODO
    return HttpResponse('processAnsweredPoll')
