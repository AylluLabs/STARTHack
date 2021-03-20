import time
import boto3
import credentials_refactor
import requests
import json


def transcribe_file(job_name, file_uri, transcribe_client):
    transcribe_client.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': file_uri},
        MediaFormat='wav',
        LanguageCode='en-US'
    )
    print("start")
    max_tries = 60
    while max_tries > 0:
        max_tries -= 1
        job = transcribe_client.get_transcription_job(TranscriptionJobName=job_name)
        job_status = job['TranscriptionJob']['TranscriptionJobStatus']
        if job_status in ['COMPLETED', 'FAILED']:
            print(f"Job {job_name} is {job_status}.")
            if job_status == 'COMPLETED':
                req = job['TranscriptionJob']['Transcript']['TranscriptFileUri']
                return req
            break
        else:
            print(f"Waiting for {job_name}. Current status is {job_status}.")
        time.sleep(10)


def transcribe():
    cred = credentials_refactor.return_credentials()
    transcribe_client = boto3.client(service_name='transcribe',
                                     aws_access_key_id=cred["AWSAccessKeyId"],
                                     aws_secret_access_key=cred["AWSSecretKey"],
                                     region_name='us-east-2'
                                     )
    print("connected")
    file_uri = 'https://ayllu.s3.us-east-2.amazonaws.com/test.wav'
    return transcribe_file('transcribe', file_uri, transcribe_client)


url = transcribe()
response = requests.get(url, verify=True)
transcript = json.loads(response.text)["results"]["transcripts"][0]["transcript"]
print(transcript)

