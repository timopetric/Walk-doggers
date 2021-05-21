from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Header
from pydantic import UUID4
from sqlalchemy.orm import Session
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from app.auth import AuthHandler
from app.postgres import actions
from app import schemas
from app.functions import get_db, check_if_user_can_apply_to_listing, check_if_user_is_author_of_listing, \
    check_if_listing_is_active
from app.postgres.models import Listing, Application

from ..geocoding_external_api import get_location_text
from geopy import distance

ListingsRouter = APIRouter()
auth_handler = AuthHandler()


@ListingsRouter.get("/", response_model=List[schemas.Listing])
def get_users_listings(db: Session = Depends(get_db), user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    user = actions.user.get(db=db, id=user_id)
    if user is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")
    return user.listings


@ListingsRouter.get("/explore", response_model=List[schemas.ListingExplore],
                    description="Get listings on explore page")
def get_listings_filtered(*, db: Session = Depends(get_db),
                          credentials: Optional[str] = Header(None,
                                                              description="If JWT is supplied, user will be taken "
                                                                          "into account and his listings will not be "
                                                                          "returned"),
                          user_lat: float = 46.0,
                          user_lon: float = 15.0,
                          user_dist: float = 10000,
                          user_dog_size0: bool = True,
                          user_dog_size1: bool = True,
                          user_dog_size2: bool = True,
                          user_dog_size3: bool = True,
                          user_dog_size4: bool = True) -> Any:

    # if credentials (= JWT) is supplied: find user and do not return his listings
    user_listing_ids = []
    if credentials:
        user_id = auth_handler.decode_token(credentials)
        user = actions.user.get(db=db, id=user_id)
        if user is None:
            raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")
        listing: Listing
        for listing in user.listings:
            user_listing_ids.append(listing.id)

    listings = actions.listing.get_all(db=db, skip=0, limit=9999999)
    if listings is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")

    categories = [0 if user_dog_size0 else None,
                  1 if user_dog_size1 else None,
                  2 if user_dog_size2 else None,
                  3 if user_dog_size3 else None,
                  4 if user_dog_size4 else None]

    filtered_listings = list()
    for listing in listings:
        lon, lat = listing.lon, listing.lat
        dist = float(distance.distance((user_lat, user_lon), (lat, lon)).km)

        if dist <= user_dist \
                and listing.dog.size_category in categories \
                and check_if_listing_is_active(listing) \
                and listing.id not in user_listing_ids:
            listing.distance = dist
            filtered_listings.append(listing)

    return filtered_listings


@ListingsRouter.get("/{id}", response_model=schemas.Listing)
def get_listing_by_id(*, db: Session = Depends(get_db), id: UUID4) -> Any:
    listing = actions.listing.get(db=db, id=id)
    if listing is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")
    return listing


@ListingsRouter.post("/", response_model=schemas.Listing, status_code=HTTP_201_CREATED)
async def add_new_listing(*, db: Session = Depends(get_db), listing_in: schemas.ListingCreate,
                          user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    dog_id = listing_in.dog_id
    dog = actions.dog.get(db=db, id=dog_id)
    # check if dog exists
    if dog is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND)

    # check if user is owner of dog
    if dog.owner_id != user_id:
        raise HTTPException(status_code=403)

    # call geocoding API and convert lat + lon to location text
    location_text = await get_location_text(listing_in.lat, listing_in.lon)

    try:
        dog = actions.listing.add_listing(db=db, author_id=user_id, location_text=location_text, obj_in=listing_in)
    except Exception:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")

    return dog
