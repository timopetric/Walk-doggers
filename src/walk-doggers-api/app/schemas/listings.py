from datetime import datetime
from typing import Optional, List

from pydantic import UUID4, BaseModel


# Shared properties
class ListingBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None

    lon: Optional[float] = None
    lat: Optional[float] = None

    dog_id: Optional[UUID4]


# Properties to receive via API on creation
class ListingCreate(ListingBase):
    title: str
    description: str
    date_from: datetime
    date_to: datetime
    lon: float
    lat: float
    dog_id: UUID4


# Properties to receive via API on update
class ListingUpdate(ListingBase):
    pass


# Properties to receive via API on update
class ListingModifyApplication(BaseModel):
    application_id: UUID4


class ListingInDBBase(ListingBase):
    id: Optional[UUID4] = None
    author_id: Optional[UUID4] = None
    dog_id: Optional[UUID4] = None
    location_text: Optional[str] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Listing(ListingInDBBase):
    author: "User"
    dog: "Dog"
    location_text: str
    applications: "List[Application]"
    pass

    # Additional properties stored in DB


class ListingInDB(ListingInDBBase):
    pass


from .users import User
from .dogs import Dog
from .applications import Application

Listing.update_forward_refs()
