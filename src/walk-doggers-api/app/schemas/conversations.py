from pydantic import BaseModel
from app.schemas import User


class ConversationsBase(BaseModel):
    user_other: User
    id_conv: str
