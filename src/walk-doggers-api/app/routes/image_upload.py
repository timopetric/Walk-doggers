from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form

ImageRouter = APIRouter()


@ImageRouter.post("/")
def upload_image(image_data: UploadFile = File(...)):
    return {"filename": image_data.filename}
