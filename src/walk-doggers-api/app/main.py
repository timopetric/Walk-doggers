import os
from fastapi import FastAPI

from app.postgres import actions
from app.postgres.session import SessionLocal
from app.routes.image_upload import ImageRouter
from app.routes.posts import PostRouter
from app.routes.conversations import ConversationRouter
from app.routes.auth import AuthRouter
from app.routes.dogs import DogsRouter
from app.routes.blog import BlogRouter
from app.routes.listings import ListingsRouter
from typing import Any

from fastapi.middleware.cors import CORSMiddleware

from app.auth import AuthHandler

# Create all tables in database.
# Comment this out if you using migrations.
# models.Base.metadata.create_all(bind=engine)

DEBUG = os.environ.get("DEBUG", False)
app = FastAPI(title="Walk doggers API", debug=DEBUG)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["default"])
def index() -> Any:
    return {"message": "Hello world!"}


app.include_router(PostRouter, tags=["Posts"], prefix="/posts")
app.include_router(ConversationRouter, tags=["Conversations"], prefix="/conversations")
app.include_router(AuthRouter, tags=["Auth"], prefix="/auth")
app.include_router(DogsRouter, tags=["Dogs"], prefix="/dogs")
app.include_router(BlogRouter, tags=["Blog"], prefix="/blog")
app.include_router(ListingsRouter, tags=["Listings"], prefix="/listings")
app.include_router(ImageRouter, tags=["ImageUpload"], prefix="/image_upload")


auth_handler = AuthHandler()


@app.on_event("startup")
async def create_admin_user():
    # Create initial admin user
    with SessionLocal() as db:
        admin_mod_email = os.environ.get("ADMIN_MOD_EMAIL", "")
        admin_mod_pass = os.environ.get("ADMIN_MOD_PASS", "")
        admin_mod_first_name = os.environ.get("ADMIN_MOD_FIRST_NAME", "")
        admin_mod_last_name = os.environ.get("ADMIN_MOD_LAST_NAME", "")

        if admin_mod_email == "" \
                or admin_mod_pass == "" \
                or admin_mod_first_name == "" \
                or admin_mod_last_name == "":
            raise ValueError("Environment vars ADMIN_MOD_... for the initial admin user are not set.")

        # delete prev user
        user = actions.user.get_user_by_email(db, admin_mod_email)
        if user:
            actions.user.remove(db, id=user.id)

        # create new admin and moderator user
        user = actions.user.create(db, obj_in={
            "email": admin_mod_email,
            "first_name": admin_mod_first_name,
            "last_name": admin_mod_last_name,
            "password": auth_handler.get_password_hash(admin_mod_pass),
            "admin": True,
            "moderator": True
        })
        if not user:
            raise Exception("Something went wrong creating the initial admin user.")
