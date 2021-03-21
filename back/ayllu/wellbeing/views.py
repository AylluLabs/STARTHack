from django.http import HttpResponse
import numpy as np
from .models import WellbeingQuestion, UserAudio, WellbeingPollAnswer
import json
from django.forms.models import model_to_dict
import boto3
from .credentials_refactor import return_credentials
from django.contrib.auth.models import User
from .tasks import transcribe, sentiment_analysis


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
    cred = return_credentials()
    if request.method == 'POST':
        print('request', request)
        user_req = request.POST["user_id"]
        print('user_req', user_req)
        file = request.FILES["file"]
        print('file', file)
        bucket = "ayllu"
        user = User.objects.get(id=user_req)
        user_audio = UserAudio(user=user)
        user_audio.save()
        s3_client = boto3.client(service_name='s3',
                                 aws_access_key_id=cred["AWSAccessKeyId"],
                                 aws_secret_access_key=cred["AWSSecretKey"])
        s3_client.upload_fileobj(file, bucket, str(user_audio.id)+".webm")

        key = str(user_audio.id)+".webm"
        url = f"https://{bucket}.s3.us-east-2.amazonaws.com/{key}"
        print('url', url)
        transcript = transcribe.transcribe(file_url=url, id=str(user_audio.id))
        sentiment, scores = sentiment_analysis.analyze_sentiment(text=transcript, language="en")
        user_audio.sentiment = sentiment
        user_audio.negative = scores["Negative"]
        user_audio.neutral = scores["Neutral"]
        user_audio.mixed = scores["Mixed"]
        user_audio.positive = scores["Positive"]
        user_audio.save()
        print(transcript)
        print(sentiment, scores)

    else:
        pass
    return HttpResponse(json.dumps({'msg':'worked'}))


def processAnsweredPoll(request):
    body_unicode = request.body.decode('utf-8')
    resp = json.loads(body_unicode)
    user = User.objects.get(username=resp["username"])
    scores = [i["qscore"] for i in resp["poll"]]
    id_questions = [i["idQuestion"] for i in resp["poll"]]
    weights = []
    i = 0
    for key in id_questions:
        question = WellbeingQuestion.objects.get(pk=key)
        weight = question.weight
        if question.weight_reversed:
            scores[i] = 11 - scores[i]
        weights.append(weight)
        i += 1
    wellbeing_score = sum(np.array(weights) * np.array(scores)) / sum(weights)
    poll = WellbeingPollAnswer(user=user)
    poll.global_score = wellbeing_score
    poll.save()

    return HttpResponse(json.dumps({"wellbeing_score": wellbeing_score}))
