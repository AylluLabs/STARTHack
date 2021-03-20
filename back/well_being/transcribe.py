import time
import boto3
import credentials
import requests


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
                '''print(
                    f"Download the transcript from\n"
                    f"\t{job['TranscriptionJob']['Transcript']['TranscriptFileUri']}.")'''
            break
        else:
            print(f"Waiting for {job_name}. Current status is {job_status}.")
        time.sleep(10)


def transcribe():
    transcribe_client = boto3.client('transcribe',
                                     aws_access_key_id=credentials.AWSAccessKeyId,
                                     aws_secret_access_key=credentials.AWSSecretKey,
                                     region_name='us-east-2'
                                     # aws_session_token=SESSION_TOKEN
                                     )
    print("connected")
    file_uri = 'https://ayllu.s3.us-east-2.amazonaws.com/test.wav'
    return transcribe_file('transcribe', file_uri, transcribe_client)


url = transcribe()
response = requests.get(url, verify=True)
print(response.text)
