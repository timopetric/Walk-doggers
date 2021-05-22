from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED, \
    HTTP_401_UNAUTHORIZED

from app.auth import AuthHandler
from app.functions import get_db
from app.postgres import actions
from app import schemas

ProfileRouter = APIRouter()

auth_handler = AuthHandler()


@ProfileRouter.get('', description="Get user Profile", response_model=schemas.User)
def protected(db: Session = Depends(get_db), user_id=Depends(auth_handler.auth_wrapper)):
    user = actions.user.get(db=db, id=user_id)
    if not user:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND)
    return user


@ProfileRouter.put('', response_model=schemas.User, status_code=HTTP_200_OK)
def update_user(*, db: Session = Depends(get_db), user_in: schemas.UserUpdate,
                user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    user = actions.user.get(db=db, id=user_id)
    if user is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error. User not found.")

    updated_user = actions.user.update(db=db, db_obj=user, obj_in=user_in)
    return updated_user
