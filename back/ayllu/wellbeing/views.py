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
    content_type = "application/json"

    return HttpResponse(json.dumps({"data": list(sample)}), content_type=content_type)


def processAudio(request):
    # TODO
    return HttpResponse('sendAudio')


def processAnsweredPoll(request):
    body_unicode = request.body.decode('utf-8')
    resp = json.loads(body_unicode)

    scores = [i["qscore"] for i in resp["poll"]]
    id_questions = [i["idQuestion"] for i in resp["poll"]]
    weights = []
    for key in id_questions:
        question = WellbeingQuestion.objects.get(pk=key)
        if question.weight_reversed:
            weight = 11 - question.weight
        else:
            weight = question.weight
        weights.append(weight)
    wellbeing_score = sum(np.array(weights) * np.array(scores)) / sum(weights)
    # TODO
    return HttpResponse(json.dumps({"wellbeing_score": wellbeing_score}))
