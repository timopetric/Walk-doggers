import io
from botocore.exceptions import ClientError
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
import boto3
import logging

ImageRouter = APIRouter()


@ImageRouter.post("/")
async def upload_image(image_data: UploadFile = File(...)):
    s3_client = boto3.client('s3')

    try:
        response = s3_client.upload_fileobj(image_data.file, "walk-doggers", "AKIA3UVOO275YXPEWAXN")
        print("____AWS reponse:_______")
        print(response)
        return {
            "message": "File uploaded successfully"
        }
    except ClientError as e:
        logging.error(e)
        return {
            "message": e,
        }


