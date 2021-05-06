from app.mongo import models

from fastapi import APIRouter, Depends, HTTPException
from odmantic import AIOEngine, ObjectId
import os
from typing import List
from motor.motor_asyncio import AsyncIOMotorClient

ConversationRouter = APIRouter()

database_mongo_uri = os.environ["DATABASE_URL_MONGODB"]
engine = AIOEngine(motor_client=AsyncIOMotorClient(database_mongo_uri))


@ConversationRouter.put("", response_model=models.Conversation)
async def create_tree(tree: models.Conversation):
    await engine.save(tree)
    return tree


@ConversationRouter.get("", response_model=List[models.Conversation])
async def get_trees():
    conversations = await engine.find(models.Conversation)
    return conversations


@ConversationRouter.get("/count", response_model=int)
async def count_trees():
    count = await engine.count(models.Conversation)
    return count


@ConversationRouter.get("/{id}", response_model=models.Conversation)
async def get_tree_by_id(id: ObjectId):
    conversation = await engine.find_one(models.Conversation, models.Conversation.id == id)
    if conversation is None:
        raise HTTPException(404)
    return conversation
