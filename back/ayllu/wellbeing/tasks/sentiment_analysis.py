import boto3
import json
from wellbeing.credentials_refactor import return_credentials


def analyze_sentiment(text, language="en"):
    cred = return_credentials()
    comprehend_client = boto3.client(service_name='comprehend',
                                     aws_access_key_id=cred["AWSAccessKeyId"],
                                     aws_secret_access_key=cred["AWSSecretKey"],
                                     region_name='us-east-2')

    resp = json.dumps(comprehend_client.detect_sentiment(Text=text, LanguageCode=language), sort_keys=True, indent=4)

    return json.loads(resp)['Sentiment'], json.loads(resp)['SentimentScore']



