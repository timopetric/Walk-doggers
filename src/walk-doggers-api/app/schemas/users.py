from typing import Optional

from pydantic import UUID4, BaseModel, Field

from app.functions import regex_password, regex_email


class Login(BaseModel):
    email: str = Field(..., example="a@a.a")
    password: str = Field(..., example="Dobr0$Geslo")


class UserBase(BaseModel):
    email: str = Field(..., example="a@a.a", regex=regex_email)
    first_name: str = Field(..., example="Janez")
    last_name: str = Field(..., example="Novak")
    description: Optional[str] = Field("", example="I love long walks in nature.")
    image_url: Optional[str] = Field("https://walk-doggers.s3.eu-central-1.amazonaws.com/download.png",
                                     example="image_url")


class UserUpdate(BaseModel):
    first_name: str = Field(..., example="Janez")
    last_name: str = Field(..., example="Novak")
    description: Optional[str] = Field("", example="I love long walks in nature.")
    image_url: Optional[str] = Field("https://walk-doggers.s3.eu-central-1.amazonaws.com/download.png")


class UserInDBBase(UserBase):
    id: Optional[UUID4] = None

    class Config:
        orm_mode = True


class User(UserInDBBase):
    rating: float
    pass


class UserRegister(UserBase):
    password: str = Field(..., example="Dobr0$Geslo", regex=regex_password)
    pass


class UserRoles(BaseModel):
    admin: Optional[bool] = False
    moderator: Optional[bool] = False
    reporter: Optional[bool] = False

    class Config:
        orm_mode = True


class UserRolesUpdate(UserBase):
    admin: Optional[bool] = False
    moderator: Optional[bool] = False
    reporter: Optional[bool] = False


class JwtToken(BaseModel):
    jwt: str
