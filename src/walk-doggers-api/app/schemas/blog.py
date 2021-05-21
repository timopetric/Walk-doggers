from typing import Optional

from pydantic import UUID4, BaseModel, Field


# Shared properties
class BlogPostBase(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    photo: Optional[str] = Field("https://walk-doggers.s3.eu-central-1.amazonaws.com/Dog_silhouette.png")


# Properties to receive via API on creation
class BlogPostCreate(BlogPostBase):
    title: str
    content: str


# Properties to receive via API on update
class BlogPostUpdate(BlogPostBase):
    pass


class BlogPostUpdateModelator(BlogPostBase):
    approved: Optional[bool] = False
    pass


class BlogPostInDBBase(BlogPostBase):
    id: Optional[UUID4] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class BlogPost(BlogPostInDBBase):
    author: "User"
    approved: bool
    pass


class BlogPostDeleted(BlogPostInDBBase):
    pass


# Additional properties stored in DB
class BlogPostInDB(BlogPostInDBBase):
    author_id: UUID4
    approved: bool
    pass


from .users import User

BlogPost.update_forward_refs()
