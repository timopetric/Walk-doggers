from datetime import datetime
from typing import Optional, List

from pydantic import UUID4, BaseModel, Field


# Shared properties
class ListingBase(BaseModel):
    title: Optional[str] = Field(..., example="Super dog listing name")
    description: Optional[str] = Field(..., example="A very cute dog listing description")
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None

    lat: Optional[float] = Field(..., example="46.048247")
    lon: Optional[float] = Field(..., example="14.509531")

    dog_id: Optional[UUID4]


# Properties to receive via API on creation
class ListingCreate(ListingBase):
    title: str = Field(..., example="Super dog listing name")
    description: str = Field(..., example="A very cute dog listing description")
    date_from: datetime
    date_to: datetime
    lat: float
    lon: float
    dog_id: UUID4 = Field(..., example="692cdce1-944c-47e6-bd80-eb2883fd27dc")


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
    applications: "List[ApplicationBrief]"

    # Additional properties stored in DB


class ListingExplore(ListingInDBBase):
    author: "User"
    dog: "Dog"
    location_text: str
    distance: float


class ListingBrief(ListingInDBBase):
    author: "User"
    dog: "Dog"
    location_text: str


class ListingInDB(ListingInDBBase):
    pass


from .users import User
from .dogs import Dog
from .applications import ApplicationBrief

Listing.update_forward_refs()
ListingExplore.update_forward_refs()
ListingBrief.update_forward_refs()
