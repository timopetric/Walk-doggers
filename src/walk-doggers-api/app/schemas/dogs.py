from typing import Optional

from pydantic import UUID4, BaseModel, Field


class DogBase(BaseModel):
    name: str = Field(..., example="Koki")
    description: Optional[str] = Field(..., example="My beautiful dog")
    size_category: int = Field(..., example=0, ge=0, le=4)
    photo: Optional[str] = Field("-", example="-")


class DogInDBBase(DogBase):
    id: Optional[UUID4] = Field(..., example="0e884724-fbed-4d4a-b8a8-9fb8fd56d838")

    class Config:
        orm_mode = True


class Dog(DogInDBBase):
    pass


class DogCreate(DogBase):
    pass


class DogUpdate(DogBase):
    pass
