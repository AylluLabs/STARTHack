import time
import boto3
from wellbeing.credentials_refactor import return_credentials
import requests
import json


def transcribe_file(job_name, file_uri, transcribe_client):
    transcribe_client.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': file_uri},
        MediaFormat='webm',
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
            if job_status == 'FAILED':
                print('job failed')

            break
        else:
            print(f"Waiting for {job_name}. Current status is {job_status}.")
        time.sleep(10)


def transcribe(file_url, id):
    cred = return_credentials()
    transcribe_client = boto3.client(service_name='transcribe',
                                     aws_access_key_id=cred["AWSAccessKeyId"],
                                     aws_secret_access_key=cred["AWSSecretKey"],
                                     region_name='us-east-2'
                                     )
    print("connected")
    uri = transcribe_file(f'transcribe-{id}', file_url, transcribe_client)
    print('uri', uri)
    response = requests.get(uri, verify=True)
    transcript = json.loads(response.text)["results"]["transcripts"][0]["transcript"]
    return transcript
