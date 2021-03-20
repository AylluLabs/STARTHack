import boto3
import credentials_refactor


def get_items(bucket):
    cred = credentials_refactor.return_credentials()
    s3_client = boto3.client(service_name= 's3',
                             aws_access_key_id=cred["AWSAccessKeyId"],
                             aws_secret_access_key=cred["AWSSecretKey"])

    response = s3_client.list_objects(Bucket=bucket)

    return response

print(get_items(bucket="ayllu"))