from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from sqlalchemy.orm import Session
from starlette.responses import Response
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT, HTTP_403_FORBIDDEN

from app.auth import AuthHandler
from app.postgres import actions
from app import schemas
from app.functions import get_db

BlogRouter = APIRouter()
auth_handler = AuthHandler()


@BlogRouter.get("/", response_model=List[schemas.BlogPost])
def get_published_blog_posts(db: Session = Depends(get_db), skip: int = 0, limit: int = 100) -> Any:
    blog_posts = actions.blog_post.get_all_filtered(db=db, skip=skip, limit=limit)
    return blog_posts


@BlogRouter.get("/unpublished", response_model=List[schemas.BlogPost], dependencies=[Depends(auth_handler.is_moderator)])
def get_blog_posts(db: Session = Depends(get_db), skip: int = 0, limit: int = 100) -> Any:
    blog_posts = actions.blog_post.get_all_filtered(db=db, skip=skip, limit=limit, approved=False)
    return blog_posts


@BlogRouter.post("/", response_model=schemas.BlogPost, status_code=HTTP_201_CREATED,
                 dependencies=[Depends(auth_handler.is_reporter)])
def create_blog_post(*, db: Session = Depends(get_db), post_in: schemas.BlogPostCreate,
                     user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    post = actions.blog_post.create_with_author(db=db, obj_in=post_in, author_id=user_id)
    return post


@BlogRouter.put(
    "/{id}",
    response_model=schemas.BlogPost,
    responses={HTTP_404_NOT_FOUND: {"model": schemas.HTTPError},
               HTTP_204_NO_CONTENT: {"model": {}, "description": "Moderator successfully rejected and with that "
                                                                 "deleted the blog post."}},
    dependencies=[Depends(auth_handler.is_moderator)]
)
def update_blog_post(
        *, db: Session = Depends(get_db), id: UUID4, post_in: schemas.BlogPostUpdateModelator,
) -> Any:
    blog_post = actions.blog_post.get(db=db, id=id)
    if not blog_post:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Post not found")

    if not post_in.approved:
        # if post is not approved by moderator, then it will be deleted - 204 NO CONTENT returned
        actions.blog_post.remove(db=db, id=blog_post.id)
        return Response(status_code=HTTP_204_NO_CONTENT)
    else:
        # if post is approved, update it with possible modifications from moderator and return it
        blog_post = actions.blog_post.update(db=db, db_obj=blog_post, obj_in=post_in)
    return blog_post


@BlogRouter.delete(
    "/{id}",
    response_model=schemas.BlogPostDeleted,
    responses={HTTP_204_NO_CONTENT: {"model": {}, "description": "Administrator successfully deleted the blog post."}},
    dependencies=[Depends(auth_handler.is_admin)],
    description="If the blog post has attribute approved set to true, administrator can delete it"
)
def delete_blog_post(*, db: Session = Depends(get_db), id: UUID4) -> Any:
    blog_post = actions.blog_post.get(db=db, id=id)
    if not blog_post:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND)

    if blog_post.approved:
        actions.blog_post.remove(db=db, id=id)
    else:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Error, moderator must approve the blog post first.")

    return Response(status_code=HTTP_204_NO_CONTENT)
