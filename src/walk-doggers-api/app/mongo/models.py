import datetime
from typing import List, Optional
from pydantic import UUID4
from odmantic import ObjectId, Model, Field, EmbeddedModel


class Message(Model):
    senderId: UUID4 = Field(..., example="692cdce1-944c-47e6-bd80-eb2883fd27dc")
    text: str = Field(..., example="An example message.")
    date: datetime.datetime
    convId: ObjectId


class MessageAdd(Model):
    text: str = Field(..., example="An example message.")


class Conversation(Model):
    user1Id: UUID4 = Field(..., example="692cdce1-944c-47e6-bd80-eb2883fd27dc")
    user2Id: UUID4 = Field(..., example="508a50ff-ff4d-4345-b365-f424dd852c4f")
    # messages: List[ObjectId] = Field([])


class ConversationAdd(Model):
    user2Id: UUID4 = Field(..., example="508a50ff-ff4d-4345-b365-f424dd852c4f")
