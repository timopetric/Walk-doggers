from typing import Optional

from pydantic import UUID4, BaseModel, Field

from app.functions import regex_password, regex_email


class Login(BaseModel):
    email: str = Field(..., example="a@a.a")
    password: str = Field(..., example="Dobr0$Geslo")


class UserBase(BaseModel):
    email: str = Field(..., example="a@a.a", regex=regex_email)
    password: str = Field(..., example="Dobr0$Geslo", regex=regex_password)
    first_name: str = Field(..., example="Janez")
    last_name: str = Field(..., example="Novak")


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
