import io
from botocore.exceptions import ClientError
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
import boto3
import logging

ImageRouter = APIRouter()

AWS_PREFIX = 'https://walk-doggers.s3.eu-central-1.amazonaws.com/'


@ImageRouter.post("/")
async def upload_image(image_data: UploadFile = File(...)):
    s3 = boto3.resource(
        's3',
        aws_access_key_id='AKIA3UVOO275YXPEWAXN',
        aws_secret_access_key='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',
    )

    content = await image_data.read()
    size = len(content)
    if size > 2e6:
        return {
            "message": f"Max allowed file size is 2MB, uploaded size was: {size}"
        }

    try:
        response = s3.Object('walk-doggers', image_data.filename).put(ACL='public-read', Body=io.BytesIO(content))
        image_uri = AWS_PREFIX + image_data.filename

        return {
            "message": f"Uploaded successfully",
            "image_uri": image_uri
        }
    except ClientError as e:
        logging.error(e)
        return {
            "message": e,
        }


