import datetime
import os

from starlette.status import HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

from app.functions import get_db, ERROR_USER_NOT_FOUND, get_user_from_id
from app.mongo.models import Conversation, Message, MessageAdd, ConversationAdd

from fastapi import APIRouter, HTTPException, Depends
from odmantic import AIOEngine, ObjectId, query
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import UUID4

from app.routes.auth import auth_handler
from sqlalchemy.orm import Session

from app.schemas import User
from app.schemas.conversations import ConversationsBase

ConversationRouter = APIRouter()

database_mongo_uri = os.environ["DATABASE_URL_MONGODB"]
engine = AIOEngine(motor_client=AsyncIOMotorClient(database_mongo_uri))


@ConversationRouter.get("", response_model=List[ConversationsBase],
                        description="Get a list of conversations from user in JWT.")
async def get_conversations_from_jwt_user(user_id_filter: Optional[str] = None,
                                          db: Session = Depends(get_db),
                                          user_id=Depends(auth_handler.auth_wrapper),
                                          skip: int = 0, limit: int = 100):

    user = get_user_from_id(db, user_id)
    conversations = await engine.find(Conversation,
                                      query.or_(Conversation.user1Id == user.id,
                                                Conversation.user2Id == user.id),
                                      skip=skip, limit=limit)

    conversation_user_list = []
    for conv in conversations:
        user_id_other = str(conv.user2Id) if str(conv.user1Id) == str(user_id) else str(conv.user1Id)
        user_other: User = get_user_from_id(db, user_id_other)
        msgs = await engine.find(Message, Message.convId == conv.id, Message.senderId == user_other.id, skip=skip,
                                 limit=limit)

        if user_id_filter and user_id_filter == user_id_other or not user_id_filter:
            conversation_user_list.append(
                {
                    "user_other": user_other,
                    "id_conv": str(conv.id),
                    "last_message_text": msgs[-1].text if len(msgs) > 0 else "User hasn't written a thing yet."
                }
            )

    return conversation_user_list


@ConversationRouter.get("/user/{user_id}", response_model=ConversationsBase,
                        dependencies=[Depends(auth_handler.auth_wrapper)],
                        description="Use GET /conversations with user_id_filter query instead! Get conversation "
                                    "info by id of the other user, if he/she exists.",
                        deprecated=True)
async def get_conversation_by_user_id(user_id_other: str, db: Session = Depends(get_db),
                                      user_id=Depends(auth_handler.auth_wrapper)):
    user = get_user_from_id(db, user_id)
    user_other = get_user_from_id(db, user_id_other)

    conv = await engine.find_one(Conversation,
                                 query.or_(
                                     query.and_(Conversation.user1Id == user.id,
                                                Conversation.user2Id == user_other.id),
                                     query.and_(Conversation.user2Id == user.id,
                                                Conversation.user1Id == user_other.id)
                                 )
                                 )
    if conv:
        user_id_other = str(conv.user2Id) if str(conv.user1Id) == str(user_id) else str(conv.user1Id)
        user_other: User = get_user_from_id(db, user_id_other)
        msgs = await engine.find(Message, Message.convId == conv.id, Message.senderId == user_other.id)
        return {
            "user_other": user_other,
            "id_conv": str(conv.id),
            "last_message_text": msgs[-1].text if len(msgs) > 0 else "User hasn't written a thing yet."
        }
        # return await get_conversation_messages(conv.id, db, user_id)
    else:
        return HTTPException(HTTP_404_NOT_FOUND, "Error, conversation with this user does not yet exist.")


@ConversationRouter.post("", response_model=Conversation,
                         description="Create a conversation between two people. userId1 will be read from jwt, "
                                     "userId2 will be read from the parameters.",
                         response_description="Newly created conversation")
async def create_conversation(conversation: ConversationAdd,
                              user_id1=Depends(auth_handler.auth_wrapper),
                              db: Session = Depends(get_db)):
    # double check if jwt user is valid
    user1 = get_user_from_id(db, user_id1)
    user_id1 = UUID4(str(user1.id))
    user_id2 = UUID4(str(conversation.user2Id))

    # check if conv already exists
    conv = await engine.find_one(
        Conversation,
        query.or_(
            query.and_(Conversation.user1Id == user_id1, Conversation.user2Id == user_id2),
            query.and_(Conversation.user1Id == user_id2, Conversation.user2Id == user_id1)
        ))
    if conv is not None:
        raise HTTPException(status_code=HTTP_409_CONFLICT,
                            detail=f"Error, a conversation between user {user_id1} and {user_id2} already exists. "
                                   f"Conversation id: {conv.id}")

    # else create new conversation and return it
    conv = Conversation(user1Id=user1.id, user2Id=conversation.user2Id)
    await engine.save(conv)
    return conv


@ConversationRouter.post("/{conv_id}/messages", response_model=Message, responses={HTTP_404_NOT_FOUND: {"model": ""}})
async def add_message_to_a_conversation(conv_id: ObjectId,
                                        message: MessageAdd,
                                        db: Session = Depends(get_db),
                                        user_id=Depends(auth_handler.auth_wrapper)):
    # double check if jwt user is valid
    user = get_user_from_id(db, user_id)

    # find conv by id
    conv = await engine.find_one(Conversation, Conversation.id == conv_id)
    if conv is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND,
                            detail=f"Error, a conversation with id: {conv_id} not found.")

    # create and add msg to conv
    msg = Message(senderId=user.id, date=datetime.datetime.now(), text=message.text, convId=conv_id)
    msg = await engine.save(msg)

    return msg


@ConversationRouter.get("/{conv_id}/messages", response_model=List[Message],
                        description="Get a list of messages from a conversation with id conv_id.")
async def get_conversation_messages(conv_id: ObjectId,
                                    db: Session = Depends(get_db),
                                    user_id=Depends(auth_handler.auth_wrapper),
                                    skip: int = 0, limit: int = 100):
    # double check if jwt user is valid
    user = get_user_from_id(db, user_id)

    # find conv by id
    conv = await engine.find_one(Conversation, Conversation.id == conv_id)
    if conv is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND,
                            detail=f"Error, a conversation with id: {conv_id} not found.")

    msgs = await engine.find(Message, Message.convId == conv_id, skip=skip, limit=limit)
    return msgs


@ConversationRouter.get("/{conv_id}/messages/count", response_model=int,
                        description="Get number of messages from a conversation with id conv_id.")
async def get_conversation_messages_count(conv_id: ObjectId,
                                          db: Session = Depends(get_db),
                                          user_id=Depends(auth_handler.auth_wrapper)):
    # double check if jwt user is valid
    user = get_user_from_id(db, user_id)

    # find conv by id
    conv = await engine.find_one(Conversation, Conversation.id == conv_id)
    if conv is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND,
                            detail=f"Error, a conversation with id: {conv_id} not found.")

    return await engine.count(Message, Message.convId == conv_id)
