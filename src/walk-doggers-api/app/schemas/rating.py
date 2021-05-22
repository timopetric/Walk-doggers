from typing import Optional, Literal

from pydantic import UUID4, BaseModel, Field


# Shared properties
class RatingBase(BaseModel):
    rating: Optional[int] = None
    # body: Optional[str] = None


# Properties to receive via API on creation
class RateByListing(BaseModel):
    listing_id: UUID4
    rating: int = Field(..., ge=1, le=5, example=2)


class RatingCreate(BaseModel):
    user_id: UUID4
    rating: int


class RatingInDBBase(RatingBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


class Rating(RatingInDBBase):
    user_id: UUID4
    rating: int


# Additional properties stored in DB
class RatingInDB(RatingInDBBase):
    pass
