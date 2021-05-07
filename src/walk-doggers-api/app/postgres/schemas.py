from typing import Optional

from pydantic import UUID4, BaseModel


class HTTPError(BaseModel):
    detail: str


# Shared properties
class PostBase(BaseModel):
    title: Optional[str] = None
    # body: Optional[str] = None


# Properties to receive via API on creation
class PostCreate(PostBase):
    title: str
    # body: str


# Properties to receive via API on update
class PostUpdate(PostBase):
    pass


class PostInDBBase(PostBase):
    id: Optional[UUID4] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Post(PostInDBBase):
    pass


# Additional properties stored in DB
class PostInDB(PostInDBBase):
    pass


class Login(BaseModel):
    email: str
    password: str


class UserBase(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str


class UserUpdate(UserBase):
    admin: Optional[bool] = False
    moderator: Optional[bool] = False
    reporter: Optional[bool] = False


class UserInDBBase(UserBase):
    id: Optional[UUID4] = None

    class Config:
        orm_mode = True


class User(UserInDBBase):
    pass


class UserRegister(UserBase):
    pass


class UserRoles(BaseModel):
    admin: Optional[bool] = False
    moderator: Optional[bool] = False
    reporter: Optional[bool] = False

    class Config:
        orm_mode = True


class JwtToken(BaseModel):
    jwt: str
