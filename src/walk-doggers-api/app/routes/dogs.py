from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from sqlalchemy.orm import Session
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from app.auth import AuthHandler
from app.postgres import actions
from app import schemas
from app.functions import get_db

DogsRouter = APIRouter()
auth_handler = AuthHandler()


@DogsRouter.get("/", response_model=List[schemas.Dog])
def get_dogs(db: Session = Depends(get_db), user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    user = actions.user.get(db=db, id=user_id)
    if user is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")
    return user.dogs


@DogsRouter.get("/{id}", response_model=schemas.Dog)
def get_dog(*, db: Session = Depends(get_db), id: UUID4) -> Any:
    dog = actions.dog.get(db=db, id=id)
    if dog is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")
    return dog


@DogsRouter.post("/", response_model=schemas.Dog, status_code=HTTP_201_CREATED)
def add_dog(*, db: Session = Depends(get_db), dog_in: schemas.DogCreate,
            user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    try:
        dog = actions.dog.add_dog(db=db, owner_id=user_id, obj_in=dog_in)
    except:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")

    return dog
