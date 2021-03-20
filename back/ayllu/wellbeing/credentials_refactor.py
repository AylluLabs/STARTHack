from .credentials import *


def return_credentials():
    configuration = {
        "AWSAccessKeyId": AWSAccessKeyId,
        "AWSSecretKey": AWSSecretKey
    }

    return configuration
