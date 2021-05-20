from typing import Optional

from pydantic import UUID4, BaseModel


# Shared properties
class ApplicationBase(BaseModel):
    status: Optional[str] = None
    # body: Optional[str] = None


# Properties to receive via API on creation
class ApplicationCreate(ApplicationBase):
    listing_id: UUID4
    soft: Optional[bool] = False

    # body: str


# Properties to receive via API on update
class ApplicationUpdate(ApplicationBase):
    pass


class ApplicationInDBBase(ApplicationBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class ApplicationBrief(ApplicationInDBBase):
    listing_author_to_applied_user_left_rating: Optional[bool] = False
    applied_user_to_listing_author_left_rating: Optional[bool] = False
    pass


class Application(ApplicationInDBBase):
    listing: "ListingBrief"
    listing_author_to_applied_user_left_rating: Optional[bool] = False
    applied_user_to_listing_author_left_rating: Optional[bool] = False

    pass


# Additional properties stored in DB
class ApplicationInDB(ApplicationInDBBase):
    pass


from .listings import ListingBrief

Application.update_forward_refs()
