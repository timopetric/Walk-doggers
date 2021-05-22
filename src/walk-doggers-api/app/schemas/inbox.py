from typing import List

from pydantic import BaseModel

from app.mongo.models import Message
from app.schemas import User


class InboxBase(BaseModel):
    user: User
    last_message_text: str

