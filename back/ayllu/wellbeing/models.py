from django.contrib.auth.models import User
from django.db import models
import json


class WellbeingQuestion(models.Model):
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.dict,
                          sort_keys=True, indent=4)

    question_text = models.CharField(max_length=300)
    weight = models.FloatField()
    weight_reversed = models.BooleanField()


class WellbeingPollAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    global_score = models.FloatField()


class WellbeingQuestionAnswer(models.Model):
    wellbeing_question = models.ForeignKey(WellbeingQuestion, on_delete=models.CASCADE)
    wellbeing_poll = models.ForeignKey(WellbeingPollAnswer, on_delete=models.CASCADE)
    question_score = models.FloatField()


class UserAudio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sentiment = models.CharField(max_length=50, blank=True, null=True)
    mixed = models.FloatField(blank=True, null=True)
    negative = models.FloatField(blank=True, null=True)
    positive = models.FloatField(blank=True, null=True)
    neutral = models.FloatField(blank=True, null=True)

