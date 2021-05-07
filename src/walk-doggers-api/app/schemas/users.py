from typing import Optional

from pydantic import UUID4, BaseModel


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
