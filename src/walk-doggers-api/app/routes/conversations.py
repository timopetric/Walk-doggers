from app.mongo.models import Conversation

from fastapi import APIRouter, Depends, HTTPException
from odmantic import AIOEngine, ObjectId
import os
from typing import List
from motor.motor_asyncio import AsyncIOMotorClient

ConversationRouter = APIRouter()

database_mongo_uri = os.environ["DATABASE_URL_MONGODB"]
engine = AIOEngine(motor_client=AsyncIOMotorClient(database_mongo_uri))


@ConversationRouter.put("", response_model=Conversation)
async def create_conversation(conversation: Conversation):
    await engine.save(conversation)
    return conversation


@ConversationRouter.get("", response_model=List[Conversation])
async def get_conversations():
    conversations = await engine.find(Conversation)
    return conversations


@ConversationRouter.get("/count", response_model=int)
async def count_conversations():
    count = await engine.count(Conversation)
    return count


@ConversationRouter.get("/{id}", response_model=Conversation)
async def get_conversation_by_id(id: ObjectId):
    conversation = await engine.find_one(Conversation, Conversation.id == id)
    if conversation is None:
        raise HTTPException(404)
    return conversation
