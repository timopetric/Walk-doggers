from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from sqlalchemy.orm import Session
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from app.auth import AuthHandler
from app.postgres import actions
from app import schemas
from app.functions import get_db, check_if_user_can_apply_to_listing, check_if_user_is_author_of_listing
from app.postgres.models import Listing, Application

ListingsRouter = APIRouter()
auth_handler = AuthHandler()


@ListingsRouter.get("/", response_model=List[schemas.Listing])
def get_users_listings(db: Session = Depends(get_db), user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    user = actions.user.get(db=db, id=user_id)
    if user is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")
    return user.listings


@ListingsRouter.get("/{id}", response_model=schemas.Listing)
def get_listing_by_id(*, db: Session = Depends(get_db), id: UUID4) -> Any:
    listing = actions.listing.get(db=db, id=id)
    if listing is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")
    return listing


@ListingsRouter.post("/", response_model=schemas.Listing, status_code=HTTP_201_CREATED)
def add_new_listing(*, db: Session = Depends(get_db), listing_in: schemas.ListingCreate,
                    user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    dog_id = listing_in.dog_id
    dog = actions.dog.get(db=db, id=dog_id)
    # check if dog exists
    if dog is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND)

    # check if user is owner of dog
    if dog.owner_id != user_id:
        raise HTTPException(status_code=403)

    # TODO call geocoding API and convert lat + lon to location text
    location_text = "TODO"

    try:
        dog = actions.listing.add_listing(db=db, author_id=user_id, location_text=location_text, obj_in=listing_in)
    except:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")

    return dog


@ListingsRouter.post("/{listing_id}/apply")
def apply_to_listing(*, db: Session = Depends(get_db), listing_id: str,
                     user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    listing: Listing = actions.listing.get(db=db, id=listing_id)

    check_if_user_can_apply_to_listing(user_id, listing)

    application = actions.application.apply_to_listing(db=db, applied_user_id=user_id, listing_id=listing_id,
                                                       soft=False)
    return application


@ListingsRouter.post("/{listing_id}/soft_apply")
def apply_to_listing(*, db: Session = Depends(get_db), listing_id: str,
                     user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    listing: Listing = actions.listing.get(db=db, id=listing_id)

    check_if_user_can_apply_to_listing(user_id, listing)

    application = actions.application.apply_to_listing(db=db, applied_user_id=user_id, listing_id=listing_id,
                                                       soft=True)
    return application


