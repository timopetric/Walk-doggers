import io
from botocore.exceptions import ClientError
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
import boto3
import logging

ImageRouter = APIRouter()


@ImageRouter.post("/")
async def upload_image(image_data: UploadFile = File(...)):
    s3 = boto3.resource(
        's3',
        aws_access_key_id='AKIA3UVOO275YXPEWAXN',
        aws_secret_access_key='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',
    )

    try:
        response = s3.Object('walk-doggers', image_data.filename).put(ACL='public-read', Body=image_data.file)
        print("____AWS reponse:_______")
        print(response)
        return {
            "message": "File uploaded successfully",
            "aws_response": response
        }
    except ClientError as e:
        logging.error(e)
        return {
            "message": e,
        }


