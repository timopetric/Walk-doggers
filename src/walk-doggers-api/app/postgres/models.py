from uuid import uuid4

from sqlalchemy import Column, String, Text, Boolean, ForeignKey, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from app.postgres.base import Base


class Post(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    title = Column(String)


class User(Base):
    __tablename__ = "user"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    email = Column(String)
    password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    description = Column(String, default="")
    image_url = Column(String, default="https://walk-doggers.s3.eu-central-1.amazonaws.com/download.png")
    admin = Column(Boolean, default=False)
    moderator = Column(Boolean, default=False)
    reporter = Column(Boolean, default=False)

    dogs = relationship("Dog", back_populates="owner")
    blog_posts = relationship("BlogPost", back_populates="author")
    listings = relationship("Listing", back_populates="author")
    ratings = relationship("Rating", back_populates="user")
    applications = relationship("Application", back_populates="applied_user")


class Dog(Base):
    __tablename__ = "dog"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    name = Column(String)
    description = Column(String)
    size_category = Column(Integer)
    photo = Column(String, default="https://walk-doggers.s3.eu-central-1.amazonaws.com/Dog_silhouette.png")
    owner_id = Column('owner_id', UUID(), ForeignKey('user.id'), nullable=False)
    owner = relationship("User", back_populates="dogs")
    listings = relationship("Listing", back_populates="dog")


class BlogPost(Base):
    __tablename__ = "blog_post"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    title = Column(String)
    content = Column(Text)
    photo = Column(String)
    author_id = Column('author_id', UUID(), ForeignKey('user.id'), nullable=False)
    approved = Column(Boolean, default=False)
    author = relationship("User", back_populates="blog_posts")


class Listing(Base):
    __tablename__ = "listing"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    title = Column(String)
    description = Column(Text)
    date_from = Column(DateTime)
    date_to = Column(DateTime)

    lon = Column(Float)
    lat = Column(Float)
    location_text = Column(String)
    distance: float

    author_id = Column('author_id', UUID(), ForeignKey('user.id'), nullable=False)
    dog_id = Column('dog_id', UUID(), ForeignKey('dog.id'), nullable=False)
    confirmed_application_id = Column('confirmed_application_id', Integer, ForeignKey('application.id'))

    author = relationship("User", back_populates="listings")
    dog = relationship("Dog", back_populates="listings")
    applications = relationship("Application", back_populates='listing',
                                primaryjoin='Listing.id == Application.listing_id')
    confirmed_application = relationship("Application", uselist=False,
                                         primaryjoin='Application.id == Listing.confirmed_application_id')


class Application(Base):
    __tablename__ = "application"
    id = Column(Integer, primary_key=True, autoincrement=True)
    listing_id = Column('listing_id', UUID(), ForeignKey('listing.id'), nullable=False)
    applied_user_id = Column('applied_user_id', UUID(), ForeignKey('user.id'), nullable=False)
    status = Column(String, default='normal')  # soft, normal, rejected, confirmed
    listing_author_to_applied_user_left_rating = Column(Boolean, default=False)
    applied_user_to_listing_author_left_rating = Column(Boolean, default=False)

    listing = relationship("Listing", back_populates='applications', foreign_keys=[listing_id])
    applied_user = relationship("User", back_populates='applications')


class Rating(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    rating = Column(Integer)
    user_id = Column('user_id', UUID(), ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates='ratings')
