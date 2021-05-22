from typing import List

from pydantic import BaseModel

from app.mongo.models import Message
from app.schemas import User


class ConversationsBase(BaseModel):
    user_other: User
    id_conv: str
    last_message_text: str


class MessagesUserAndInfo(BaseModel):
    user_other: User
    messages: List[Message]
