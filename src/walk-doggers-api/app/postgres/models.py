from uuid import uuid4

from sqlalchemy import Column, String, Text, Boolean, ForeignKey, Integer, DateTime
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
    admin = Column(Boolean, default=False)
    moderator = Column(Boolean, default=False)
    reporter = Column(Boolean, default=False)
    dogs = relationship("Dog", back_populates="owner")
    blog_posts = relationship("BlogPost", back_populates="author")
    listings = relationship("Listing", back_populates="author")


class Dog(Base):
    __tablename__ = "dog"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    name = Column(String)
    description = Column(String)
    size_category = Column(Integer)
    photo = Column(String)
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

    author_id = Column('author_id', UUID(), ForeignKey('user.id'), nullable=False)
    dog_id = Column('dog_id', UUID(), ForeignKey('dog.id'), nullable=False)

    author = relationship("User", back_populates="listings")
    dog = relationship("Dog", back_populates="listings")
