import io
import string
import random
from botocore.exceptions import ClientError
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
import boto3
import logging
import os

ImageRouter = APIRouter()

AWS_URL_PREFIX = os.environ.get("AWS_URL_PREFIX", "")
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY", "")


@ImageRouter.post("/")
async def upload_image(image_data: UploadFile = File(...)):
    if len(AWS_URL_PREFIX) == 0 \
            or len(AWS_ACCESS_KEY_ID) == 0 \
            or len(AWS_SECRET_ACCESS_KEY) == 0:
        logging.error("set the environment variables for AWS image upload")
        return {
            "message": f"Server error. Please ask administrator to set the environment variables for AWS image upload."
        }

    print(image_data.type)

    s3 = boto3.resource(
        's3',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )

    content = await image_data.read()
    size = len(content)
    if size > 2e6:
        return {
            "message": f"Max allowed file size is 2MB, uploaded size was: {size}"
        }

    letters = string.ascii_lowercase
    rnd_name = ''.join(random.choice(letters) for i in range(15))

    try:
        response = s3.Object('walk-doggers', rnd_name).put(ACL='public-read', Body=io.BytesIO(content))
        image_uri = AWS_URL_PREFIX + rnd_name

        return {
            "message": f"Uploaded successfully",
            "image_uri": image_uri
        }
    except ClientError as e:
        logging.error(e)
        return {
            "message": e,
        }
