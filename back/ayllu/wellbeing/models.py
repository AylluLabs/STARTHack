from django.contrib.auth.models import User
from django.db import models

class WellbeingQuestion(models.Model):
    question_text = models.CharField(max_length=300)
    weight = models.FloatField()
    weight_reversed = models.BooleanField()

class WellbeingPollAnswer(models.Model):    
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    global_score = models.FloatField()

class WellbeingQuestionAnswer(models.Model):
    wellbeing_question = models.ForeignKey(WellbeingQuestion, on_delete=models.CASCADE)
    wellbeing_poll = models.ForeignKey(WellbeingPollAnswer, on_delete = models.CASCADE)
    question_score = models.FloatField()
