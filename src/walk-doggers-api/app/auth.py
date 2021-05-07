import jwt
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.functions import get_db
from app.postgres import actions
from app.postgres.models import User


class AuthHandler:
    security = HTTPBearer()
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    secret = 'SECRET'

    def get_password_hash(self, password):
        return self.pwd_context.hash(password)

    def verify_password(self, plain_password, hashed_password):
        return self.pwd_context.verify(plain_password, hashed_password)

    def encode_token(self, user_id):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=30, minutes=0),
            'iat': datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            self.secret,
            algorithm='HS256'
        )

    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.secret, algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Signature has expired')
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail='Invalid token')

    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
        return self.decode_token(auth.credentials)

    def is_admin(self, db: Session = Depends(get_db), auth: HTTPAuthorizationCredentials = Security(security)):
        user_id = self.decode_token(auth.credentials)
        user: User = actions.user.get(db=db, id=user_id)
        if not user.admin:
            raise HTTPException(status_code=403, detail='Permission denied')

    def is_moderator(self, db: Session = Depends(get_db), auth: HTTPAuthorizationCredentials = Security(security)):
        user_id = self.decode_token(auth.credentials)
        user: User = actions.user.get(db=db, id=user_id)
        if not user.moderator:
            raise HTTPException(status_code=403, detail='Permission denied')

    def is_reporter(self, db: Session = Depends(get_db), auth: HTTPAuthorizationCredentials = Security(security)):
        user_id = self.decode_token(auth.credentials)
        user: User = actions.user.get(db=db, id=user_id)
        if not user.reporter:
            raise HTTPException(status_code=403, detail='Permission denied')
