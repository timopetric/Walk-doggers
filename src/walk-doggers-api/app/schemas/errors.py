from typing import Optional

from pydantic import UUID4, BaseModel


class HTTPError(BaseModel):
    detail: str
