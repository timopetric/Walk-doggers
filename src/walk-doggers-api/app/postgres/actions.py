import uuid
from pprint import pprint
from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import UUID4, BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import update, and_

from app.postgres import Base
from app import schemas
from app.postgres.models import Post, User, Dog, BlogPost, Listing, Application, Rating

# Define custom types for SQLAlchemy model, and Pydantic schemas
ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class BaseActions(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """Base class that can be extend by other action classes.
           Provides basic CRUD and listing operations.

        :param model: The SQLAlchemy model
        :type model: Type[ModelType]
        """
        self.model = model

    def get_all(
            self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()

    def get(self, db: Session, id: UUID4) -> Optional[ModelType]:
        return db.query(self.model).filter(self.model.id == id).first()

    def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
            self,
            db: Session,
            *,
            db_obj: ModelType,
            obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: UUID4) -> ModelType:
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj


class UserActions(BaseActions[User, schemas.UserRegister, schemas.UserRegister]):
    """Users actions with basic CRUD operations"""

    def get_user_by_email(self, db: Session, email: str) -> Optional[ModelType]:
        return db.query(self.model).filter(self.model.email == email).first()


class DogActions(BaseActions[Dog, schemas.DogCreate, schemas.Dog]):
    """Dogs actions with basic CRUD operations"""

    def add_dog(self, db: Session, owner_id: UUID4, obj_in: schemas.DogCreate) -> Optional[ModelType]:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


class BlogPostActions(BaseActions[BlogPost, schemas.BlogPostCreate, schemas.BlogPostUpdate]):
    """Post actions with basic CRUD operations"""

    def create_with_author(self, db: Session, author_id: UUID4, obj_in: schemas.BlogPostCreate) -> Optional[ModelType]:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, author_id=author_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_all_filtered(self, db: Session, *, skip: int = 0, limit: int = 100, approved: bool = True) -> List[
        ModelType]:
        return db.query(self.model).filter(self.model.approved == approved).offset(skip).limit(limit).all()


class ListingActions(BaseActions[Listing, schemas.ListingCreate, schemas.ListingUpdate]):
    """Post actions with basic CRUD operations"""

    def add_listing(self, db: Session, author_id: UUID4, location_text: str, obj_in: schemas.ListingCreate) -> Optional[
        ModelType]:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, author_id=author_id, location_text=location_text)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


class ApplicationActions(BaseActions[Application, schemas.ApplicationCreate, schemas.ApplicationUpdate]):
    """Post actions with basic CRUD operations"""

    def apply_to_listing(self, db: Session, listing_id: UUID4, applied_user_id: UUID4, soft: bool = False):
        status = 'normal'
        if soft:
            status = 'soft'
        db_obj = self.model(listing_id=listing_id, applied_user_id=applied_user_id, status=status)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_applications_by_listing_id_and_status(self, db: Session, listing_id: UUID4, status: str) -> Optional[
        ModelType]:
        return db.query(self.model).filter(self.model.listing_id == listing_id).filter(
            self.model.status == status).all()

    def get_applications_by_listing_id_and_user_id(self, db: Session, listing_id: UUID4, user_id: UUID4) -> Optional[
        ModelType]:
        return db.query(self.model).filter(self.model.listing_id == listing_id).filter(
            self.model.applied_user_id == user_id).first()

    def reject_unconfirmed_applications(self, db: Session, listing_id: UUID4) -> Optional[ModelType]:
        db.query(self.model).filter(self.model.listing_id == listing_id).filter(
            self.model.status != "confirmed").update({"status": "rejected"}, synchronize_session="fetch")
        db.commit()

    def remove_application(self, db: Session, *, id: int) -> ModelType:
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj


class RatingActions(BaseActions[Rating, schemas.RatingCreate, schemas.RatingCreate]):
    """Post actions with basic CRUD operations"""
    pass


user = UserActions(User)
dog = DogActions(Dog)
blog_post = BlogPostActions(BlogPost)
listing = ListingActions(Listing)
application = ApplicationActions(Application)
rating = RatingActions(Rating)
