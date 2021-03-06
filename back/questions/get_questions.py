# coding=utf-8
import pandas as pd

ques_importance = {"I easily adapt to day-to-day changes of my life and manage my responsibilities well.": 0.911,
                   "I care for things that are important to me, not what is important to others.": 0.868,
                   "I feel I am a sensible person.": 0.862,
                   "I am flexible.": 0.825,
                   "I understand the expectation from me.": 0.822,
                   "I feel I am capable of decision-making.": 0.821,
                   "I feel depressed from the stress and demands of day-to-day life. *": 0.820,
                   "I believe that I have a purpose and direction in life.": 0.803,
                   "I think life is a continuous process of learning": 0.766,
                   "I am a confident person.": 0.755,
                   "I am an important part of my team and organization.": 0.880,
                   "People are trustworthy in my team.": 0.854,
                   "I am close to my teammates in my organization.": 0.828,
                   "My team is a great source of social support.": 0.823,
                   "My views are well accepted by my teammates.": 0.816,
                   "People in my team don’t help each other in difficult times. *": 0.799,
                   "I take active part in important decision-making activities of my team.": 0.796,
                   "I love to spend time with my teammates.": 0.783,
                   "I can freely share my problems with my colleagues.": 0.782,
                   "My day-to-day activities contribute towards the benefits of my team.": 0.768,
                   "I am quite satisfied with my job.": 0.862,
                   "I enjoy meaningful work": 0.825,
                   "I attach lots of value to my work.": 0.817,
                   "My work achievement often acts as a source of motivation.": 0.806,
                   "My workplace is very conducive.": 0.778,
                   "My job provides ample scope for career growth.": 0.763,
                   "I used to maintain a balance between work and home life": 0.702,
                   "My employer does care a lot about their employees.": 0.667,
                   "My work offers challenges to advance my skills.": 0.582,
                   "Mostly I feel happy.": 0.825,
                   "I am an optimistic person.": 0.777,
                   "I feel good about myself.": 0.722,
                   "My life is mostly sorrowful. *": 0.593
                   }

questions_df = pd.DataFrame(
    data={'question_text': list(ques_importance.keys()), 'importance': list(ques_importance.values())})
questions_df["reversed"] = [False] * questions_df.shape[0]
questions_df.loc[questions_df.question_text.str.contains(r"*", regex=False), "reversed"] = True
questions_df["question_text"] = questions_df["question_text"].str.replace("*", "")
questions_df.to_csv("questions_importance.csv", index=False)
