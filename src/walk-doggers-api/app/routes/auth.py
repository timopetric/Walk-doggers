from typing import Any, Generator, List

from fastapi import APIRouter, Depends, HTTPException
from odmantic import AIOEngine
from pydantic import UUID4
from sqlalchemy.orm import Session
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from app.postgres import actions, schemas
from app.postgres.session import SessionLocal
from app.functions import get_db
from app.auth import AuthHandler

AuthRouter = APIRouter()

auth_handler = AuthHandler()


@AuthRouter.post("/login", response_model=schemas.JwtToken)
def login(*, db: Session = Depends(get_db), auth_details: schemas.Login) -> Any:
    user = actions.user.get_user_by_email(db=db, email=auth_details.email)
    if user is None or not auth_handler.verify_password(auth_details.password, user.password):
        raise HTTPException(status_code=401, detail='Invalid username and/or password')
    jwt = auth_handler.encode_token(str(user.id))
    return {'jwt': jwt}


@AuthRouter.post("/register", response_model=schemas.User, status_code=201)
def register(*, db: Session = Depends(get_db), auth_details: schemas.UserRegister) -> Any:
    if actions.user.get_user_by_email(db=db, email=auth_details.email) is not None:
        raise HTTPException(status_code=400, detail='email is taken')
    auth_details.password = auth_handler.get_password_hash(auth_details.password)
    user = actions.user.create(db=db, obj_in=auth_details)
    return user

@AuthRouter.get('/protected')
def protected(uset_id=Depends(auth_handler.auth_wrapper)):
    return { 'name': uset_id }