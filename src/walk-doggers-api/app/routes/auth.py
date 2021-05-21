from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.status import HTTP_404_NOT_FOUND,HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED,\
    HTTP_401_UNAUTHORIZED

from app.auth import AuthHandler
from app.functions import get_db
from app.postgres import actions
from app import schemas

AuthRouter = APIRouter()

auth_handler = AuthHandler()


@AuthRouter.post("/login", response_model=schemas.JwtToken)
def login(*, db: Session = Depends(get_db), auth_details: schemas.Login) -> Any:
    email_str = auth_details.email.lower()
    user = actions.user.get_user_by_email(db=db, email=email_str)
    if user is None or not auth_handler.verify_password(auth_details.password, user.password):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail='Invalid username and/or password')
    jwt = auth_handler.encode_token(str(user.id))
    return {'jwt': jwt}


@AuthRouter.post("/register", response_model=schemas.JwtToken, status_code=HTTP_201_CREATED)
def register(*, db: Session = Depends(get_db), auth_details: schemas.UserRegister) -> Any:
    email_str = auth_details.email.lower()
    if actions.user.get_user_by_email(db=db, email=email_str) is not None:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail='email is taken')
    auth_details.password = auth_handler.get_password_hash(auth_details.password)
    user = actions.user.create(db=db, obj_in=auth_details)
    if user is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail='Error')
    jwt = auth_handler.encode_token(str(user.id))
    return {'jwt': jwt}


@AuthRouter.put("/update_user", response_model=schemas.User, status_code=HTTP_200_OK)
def update_user(*, db: Session = Depends(get_db), user_in: schemas.UserUpdate,
                user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    # double check if user exists
    user = actions.user.get(db=db, id=user_id)
    if user is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error. User not found.")

    user_out = actions.user.update(db=db, db_obj=user, obj_in=user_in)
    return user_out


@AuthRouter.get('/roles', response_model=schemas.UserRoles)
def protected(user_id=Depends(auth_handler.auth_wrapper), db: Session = Depends(get_db)):
    user = actions.user.get(db=db, id=user_id)
    return user


@AuthRouter.post('/roles/become_reporter', response_model=schemas.UserRoles, status_code=HTTP_200_OK)
def become_reporter(*, user_id=Depends(auth_handler.auth_wrapper), db: Session = Depends(get_db)) -> Any:
    user = actions.user.get(db=db, id=user_id)

    if not user:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND)

    user.reporter = True

    user = actions.user.update(db=db, db_obj=user, obj_in=user.__dict__)
    return user


@AuthRouter.get('/protected', description="Return currently logged in user id. (From jwt)", response_model=schemas.User)
def protected(db: Session = Depends(get_db), user_id=Depends(auth_handler.auth_wrapper)):
    user = actions.user.get(db=db, id=user_id)
    if not user:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND)

    return user


@AuthRouter.get('/protected/admin', dependencies=[Depends(auth_handler.is_admin)])
def admin_protected():
    return {'status': 'ok'}


@AuthRouter.get('/protected/moderator', dependencies=[Depends(auth_handler.is_moderator)])
def mod_protected():
    return {'status': 'ok'}


@AuthRouter.get('/protected/reporter', dependencies=[Depends(auth_handler.is_reporter)])
def reporter_protected():
    return {'status': 'ok'}
