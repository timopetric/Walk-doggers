import datetime
import os

from starlette.status import HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

from app import schemas
from app.functions import get_db, ERROR_USER_NOT_FOUND, get_user_from_id
from app.mongo.models import Conversation, Message, MessageAdd, ConversationAdd

from fastapi import APIRouter, HTTPException, Depends
from odmantic import AIOEngine, ObjectId, query
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import UUID4

from app.routes.auth import auth_handler
from sqlalchemy.orm import Session

from app.schemas import User, InboxBase
from app.schemas.conversations import ConversationsBase

InboxRouter = APIRouter()

database_mongo_uri = os.environ["DATABASE_URL_MONGODB"]
engine = AIOEngine(motor_client=AsyncIOMotorClient(database_mongo_uri))


@InboxRouter.get("", response_model=List[InboxBase],
                 description="Get a list of conversations from user in JWT.")
async def get_conversations_from_jwt_user(user_id_filter: Optional[str] = None,
                                          db: Session = Depends(get_db),
                                          user_id=Depends(auth_handler.auth_wrapper),
                                          ):
    user = get_user_from_id(db, user_id)
    conversations = await engine.find(Conversation,
                                      query.or_(Conversation.user1Id == user.id,
                                                Conversation.user2Id == user.id))

    conversation_user_list = []
    for conv in conversations:
        user_id_other = str(conv.user2Id) if str(conv.user1Id) == str(user_id) else str(conv.user1Id)
        user_other: User = get_user_from_id(db, user_id_other)
        msgs = await engine.find(Message, Message.convId == conv.id, limit=1)

        if user_id_filter and user_id_filter == user_id_other or not user_id_filter:
            conversation_user_list.append(
                {
                    "user": user_other,
                    "last_message_text": msgs[-1].text if len(msgs) > 0 else "User hasn't written a thing yet."
                }
            )

    return conversation_user_list


@InboxRouter.post("", response_model=Message, responses={HTTP_404_NOT_FOUND: {"model": ""}})
async def send_message_to_user(message_in: schemas.PostCreate,
                               db: Session = Depends(get_db),
                               user_id=Depends(auth_handler.auth_wrapper)):
    # double check if jwt user is valid
    sender = get_user_from_id(db, user_id)
    receiver = get_user_from_id(db, message_in.receiver_id)

    conv = await engine.find_one(Conversation,
                                 query.or_(
                                     query.and_(Conversation.user1Id == sender.id,
                                                Conversation.user2Id == receiver.id),
                                     query.and_(Conversation.user2Id == sender.id,
                                                Conversation.user1Id == receiver.id)
                                 )
                                 )

    if conv is None:
        new_conversation = Conversation(user1Id=sender.id, user2Id=receiver.id)
        conv = await engine.save(new_conversation)

    # create and add msg to conv
    msg = Message(senderId=sender.id, date=datetime.datetime.now(), text=message_in.message, convId=conv.id)
    msg = await engine.save(msg)
    return msg


@InboxRouter.get("/{user2_id}", response_model=List[Message],
                 description="Get a list of messages from a conversation with id conv_id.")
async def get_conversation_messages(user2_id: UUID4,
                                    db: Session = Depends(get_db),
                                    user_id=Depends(auth_handler.auth_wrapper),
                                    skip: int = 0, limit: int = 100):
    # double check if jwt user is valid
    user = get_user_from_id(db, user_id)
    user2 = get_user_from_id(db, user2_id)

    conv = await engine.find_one(Conversation,
                                 query.or_(
                                     query.and_(Conversation.user1Id == user2.id,
                                                Conversation.user2Id == user.id),
                                     query.and_(Conversation.user2Id == user2.id,
                                                Conversation.user1Id == user.id)
                                 )
                                 )
    if conv is None:
        new_conversation = Conversation(user1Id=user.id, user2Id=user2.id)
        conv = await engine.save(new_conversation)

    msgs = await engine.find(Message, Message.convId == conv.id, skip=skip, limit=limit)
    return msgs
