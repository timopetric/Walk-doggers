from uuid import uuid4

from sqlalchemy import Column, String, Text, Boolean, ForeignKey, Integer
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


class Dog(Base):
    __tablename__ = "dog"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    name = Column(String)
    description = Column(String)
    size_category = Column(Integer)
    photo = Column(String)
    owner_id = Column('owner_id', UUID(), ForeignKey('user.id'), nullable=False)

    owner = relationship("User", back_populates="dogs")
