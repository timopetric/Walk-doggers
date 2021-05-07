from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import AuthHandler
from app.functions import get_db
from app.postgres import actions
from app import schemas

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


@AuthRouter.get('/roles', response_model=schemas.UserRoles)
def protected(user_id=Depends(auth_handler.auth_wrapper), db: Session = Depends(get_db)):
    user = actions.user.get(db=db, id=user_id)
    return user


@AuthRouter.post('/roles/become_reporter', response_model=schemas.UserRoles, status_code=200)
def become_reporter(*, user_id=Depends(auth_handler.auth_wrapper), db: Session = Depends(get_db)) -> Any:
    user = actions.user.get(db=db, id=user_id)

    if not user:
        raise HTTPException(status_code=404)

    user.reporter = True

    user = actions.user.update(db=db, db_obj=user, obj_in=user.__dict__)
    return user


@AuthRouter.get('/protected')
def protected(user_id=Depends(auth_handler.auth_wrapper)):
    return {'user_id': user_id}


@AuthRouter.get('/protected/admin', dependencies=[Depends(auth_handler.is_admin)])
def admin_protecter():
    return {'status': 'ok'}


@AuthRouter.get('/protected/moderator', dependencies=[Depends(auth_handler.is_moderator)])
def mod_protected():
    return {'status': 'ok'}


@AuthRouter.get('/protected/reporter', dependencies=[Depends(auth_handler.is_reporter)])
def reporter_protected():
    return {'status': 'ok'}
