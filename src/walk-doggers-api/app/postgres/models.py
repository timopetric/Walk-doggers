from uuid import uuid4

from sqlalchemy import Column, String, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID

from app.postgres.base import Base


class Post(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    title = Column(String)


class User(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    email = Column(String)
    password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    admin = Column(Boolean, default=False)
    moderator = Column(Boolean, default=False)
    reporter = Column(Boolean, default=False)