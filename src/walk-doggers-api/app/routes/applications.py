from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
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

ApplicationsRouter = APIRouter()
auth_handler = AuthHandler()


@ApplicationsRouter.get("/", response_model=List[schemas.Application])
def get_users_applications(db: Session = Depends(get_db), user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    user = actions.user.get(db=db, id=user_id)
    if user is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")
    return user.applications


@ApplicationsRouter.post("/")
def apply_to_listing(*, db: Session = Depends(get_db), application_in: schemas.ApplicationCreate,
                     user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    listing: Listing = actions.listing.get(db=db, id=application_in.listing_id)
    check_if_user_can_apply_to_listing(user_id, listing)
    application = actions.application.apply_to_listing(db=db, applied_user_id=user_id,
                                                       listing_id=str(application_in.listing_id),
                                                       soft=application_in.soft)
    return application


@ApplicationsRouter.put("/{application_id}", response_model=schemas.Application)
def confirm_reject_application(*, db: Session = Depends(get_db), application_in: schemas.ApplicationUpdate, application_id: int,
                     user_id=Depends(auth_handler.auth_wrapper)) -> Any:
    application: Application = actions.application.get(db=db, id=application_id)

    if application.listing.author_id != user_id:
        raise HTTPException(status_code=403)

    confirmed_applications = actions.application.get_applications_by_listing_id_and_status(db=db,
                                                                                           listing_id=application.listing_id,
                                                                                           status='confirmed')
    if not len(confirmed_applications) != 0:
        raise HTTPException(status_code=409, detail="You can't accept or reject applications for confirmed listing")

    actions.application.update(db=db, db_obj=application, obj_in=application_in)
    return application
