import credentials


def return_credentials():
    configuration = {
        "AWSAccessKeyId": credentials.AWSAccessKeyId,
        "AWSSecretKey": credentials.AWSSecretKey
    }

    return configuration


def return_db_psw():
    return credentials.db_psw
