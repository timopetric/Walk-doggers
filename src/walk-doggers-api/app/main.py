import os
from fastapi import FastAPI

from app.routes.image_upload import ImageRouter
from app.routes.posts import PostRouter
from app.routes.conversations import ConversationRouter
from app.routes.auth import AuthRouter
from app.routes.dogs import DogsRouter
from app.routes.blog import BlogRouter
from typing import Any

# Create all tables in database.
# Comment this out if you using migrations.
# models.Base.metadata.create_all(bind=engine)


DEBUG = os.environ.get("DEBUG", False)
app = FastAPI(title="Walk doggers API", debug=DEBUG)


@app.get("/", tags=["default"])
def index() -> Any:
    return {"message": "Hello world!"}


app.include_router(PostRouter, tags=["Posts"], prefix="/posts")
app.include_router(ConversationRouter, tags=["Conversations"], prefix="/conversations")
app.include_router(AuthRouter, tags=["Auth"], prefix="/auth")
app.include_router(DogsRouter, tags=["Dogs"], prefix="/dogs")
app.include_router(BlogRouter, tags=["Blog"], prefix="/blog")
app.include_router(ImageRouter, tags=["ImageUpload"], prefix="/image_upload")
