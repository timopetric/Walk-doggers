from typing import Optional, Literal

from pydantic import UUID4, BaseModel


# Shared properties
class ApplicationBase(BaseModel):
    status: Optional[str] = None
    # body: Optional[str] = None


# Properties to receive via API on creation
class ApplicationCreate(ApplicationBase):
    listing_id: str
    soft: Optional[bool] = False

    # body: str


# Properties to receive via API on update
class ApplicationUpdate(ApplicationBase):
    status: Literal['confirmed', 'rejected']
    pass


class ApplicationInDBBase(ApplicationBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class ApplicationBrief(ApplicationInDBBase):
    listing_author_to_applied_user_left_rating: Optional[bool] = False
    applied_user_to_listing_author_left_rating: Optional[bool] = False


class Application(ApplicationInDBBase):
    listing: "ListingBrief"
    listing_author_to_applied_user_left_rating: Optional[bool] = False
    applied_user_to_listing_author_left_rating: Optional[bool] = False


class ApplicationWithUserBrief(ApplicationInDBBase):
    applied_user: "User"
    listing_author_to_applied_user_left_rating: Optional[bool] = False
    applied_user_to_listing_author_left_rating: Optional[bool] = False
    pass


# Additional properties stored in DB
class ApplicationInDB(ApplicationInDBBase):
    pass


from .listings import ListingBrief
from .users import User

Application.update_forward_refs()
ApplicationWithUserBrief.update_forward_refs()
