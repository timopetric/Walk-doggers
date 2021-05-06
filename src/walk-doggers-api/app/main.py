import os

from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

# Create all tables in database.
# Comment this out if you using migrations.
# models.Base.metadata.create_all(bind=engine)

from app.routes.posts import PostRouter
# from app.routes.conversations import ConversationRouter
from typing import Any

app = FastAPI(title="Walk doggers API", debug=True)



@app.get("/", tags=["default"])
def index() -> Any:
    return {"message": "Hello world!"}


app.include_router(PostRouter, tags=["Posts"], prefix="/posts")
# app.include_router(ConversationRouter, tags=["Conversations"], prefix="/conversations")
