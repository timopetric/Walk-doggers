from typing import Optional

from pydantic import UUID4, BaseModel


class JwtToken(BaseModel):
    jwt: str
