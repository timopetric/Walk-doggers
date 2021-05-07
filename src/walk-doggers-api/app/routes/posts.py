from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from sqlalchemy.orm import Session
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from app.postgres import actions
from app import schemas
from app.functions import get_db

PostRouter = APIRouter()


@PostRouter.get("", response_model=List[schemas.Post])
def list_posts(db: Session = Depends(get_db), skip: int = 0, limit: int = 100) -> Any:
    posts = actions.post.get_all(db=db, skip=skip, limit=limit)
    return posts


@PostRouter.post(
    "", response_model=schemas.Post, status_code=HTTP_201_CREATED
)
def create_post(*, db: Session = Depends(get_db), post_in: schemas.PostCreate) -> Any:
    post = actions.post.create(db=db, obj_in=post_in)
    return post


@PostRouter.put(
    "/{id}",
    response_model=schemas.Post,
    responses={HTTP_404_NOT_FOUND: {"model": schemas.HTTPError}},
)
def update_post(
        *, db: Session = Depends(get_db), id: UUID4, post_in: schemas.PostUpdate,
) -> Any:
    post = actions.post.get(db=db, id=id)
    if not post:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Post not found")
    post = actions.post.update(db=db, db_obj=post, obj_in=post_in)
    return post


@PostRouter.get(
    "/{id}",
    response_model=schemas.Post,
    responses={HTTP_404_NOT_FOUND: {"model": schemas.HTTPError}},
)
def get_post(*, db: Session = Depends(get_db), id: UUID4) -> Any:
    post = actions.post.get(db=db, id=id)
    if not post:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Post not found")
    return post


@PostRouter.delete(
    "/{id}",
    response_model=schemas.Post,
    responses={HTTP_404_NOT_FOUND: {"model": schemas.HTTPError}},
)
def delete_post(*, db: Session = Depends(get_db), id: UUID4) -> Any:
    post = actions.post.get(db=db, id=id)
    if not post:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Post not found")
    post = actions.post.remove(db=db, id=id)
    return post
