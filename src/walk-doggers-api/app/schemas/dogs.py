from typing import Optional

from pydantic import UUID4, BaseModel


class DogBase(BaseModel):
    name: str
    description: Optional[str] = None
    size_category: int
    photo: Optional[str] = None


class DogInDBBase(DogBase):
    id: Optional[UUID4] = None

    class Config:
        orm_mode = True


class Dog(DogInDBBase):
    pass


class DogCreate(DogBase):
    pass
