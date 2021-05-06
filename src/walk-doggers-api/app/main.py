import os

from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

# Create all tables in database.
# Comment this out if you using migrations.
# models.Base.metadata.create_all(bind=engine)

from app.routes.posts import PostRouter
from app.routes.conversations import ConversationRouter
from app.routes.auth import AuthRouter

from typing import Any, Generator
from app.postgres.session import SessionLocal

app = FastAPI(title="Walk doggers API", debug=True)


# Dependency to get DB session.
def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.get("/", tags=["default"])
def index() -> Any:
    return {"message": "Hello world!"}


app.include_router(PostRouter, tags=["Posts"], prefix="/posts")
app.include_router(ConversationRouter, tags=["Conversations"], prefix="/conversations")
app.include_router(AuthRouter, tags=["Auth"], prefix="/auth")
