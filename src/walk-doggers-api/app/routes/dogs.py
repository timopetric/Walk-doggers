from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from sqlalchemy.orm import Session
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST

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


@DogsRouter.get("/{dog_id}", response_model=schemas.Dog)
def get_dog(*, db: Session = Depends(get_db), dog_id: UUID4) -> Any:
    dog = actions.dog.get(db=db, id=dog_id)
    if dog is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")
    return dog


@DogsRouter.post("/", response_model=schemas.Dog, status_code=HTTP_201_CREATED)
def add_dog(*, db: Session = Depends(get_db), dog_in: schemas.DogCreate,
            user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    if dog_in and len(dog_in.name) == 0:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Error. Name can not be empty.")
    try:
        dog = actions.dog.add_dog(db=db, owner_id=user_id, obj_in=dog_in)
    except Exception:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")

    return dog


@DogsRouter.put(
    "/{dog_id}",
    response_model=schemas.Dog,
    responses={HTTP_404_NOT_FOUND: {"model": schemas.HTTPError}},
    dependencies=[Depends(auth_handler.auth_wrapper)]
)
def update_dog(*, db: Session = Depends(get_db), dog_id: UUID4, dog_in: schemas.DogUpdate,
               user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    # double check if user exists
    user = actions.user.get(db=db, id=user_id)
    if user is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error. User not found.")

    # check if dog is belonging to the user from jwt
    if dog_id not in [d.id for d in user.dogs]:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=f"Error. User with id: {user_id} is not the "
                                                                   f"owner of of dog with id: {dog_id}.")

    dog = actions.dog.get(db=db, id=dog_id)
    if not dog:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Dog not found")
    dog = actions.dog.update(db=db, db_obj=dog, obj_in=dog_in)
    return dog
