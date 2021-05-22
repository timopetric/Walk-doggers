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

RatingsRouter = APIRouter()
auth_handler = AuthHandler()


@RatingsRouter.post("", response_model=schemas.Rating, status_code=HTTP_201_CREATED)
async def rate_user(*, db: Session = Depends(get_db), rating_in: schemas.RateByListing,
                    user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    listing = actions.listing.get(db=db, id=rating_in.listing_id)

    if listing is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND)

    if listing.confirmed_application is None:
        raise HTTPException(status_code=403, detail="You can't leave rating for this listing")

    application: Application = listing.confirmed_application

    # listing author to walker rating
    if listing.author_id == user_id and not listing.author_left_review:
        rated_user_id = application.applied_user_id
        rating_obj = schemas.RatingCreate(user_id=rated_user_id, rating=rating_in.rating)

        actions.listing.update(db=db, db_obj=listing, obj_in={"author_left_review": True})
        rating = actions.rating.create(db=db, obj_in=rating_obj)

        return rating

    # walker to listing author rating
    if application.applied_user_id == user_id and not listing.walker_left_review:
        rated_user_id = listing.author_id
        rating_obj = schemas.RatingCreate(user_id=rated_user_id, rating=rating_in.rating)

        actions.listing.update(db=db, db_obj=listing, obj_in={"walker_left_review": True})
        rating = actions.rating.create(db=db, obj_in=rating_obj)

        return rating

    raise HTTPException(status_code=403, detail="You can't leave rating for this listing")
