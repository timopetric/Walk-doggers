from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import close_all_sessions

from app.config import settings
from app.functions import get_db
from app.main import app
from app.postgres import Base


def database_clear_postgres(_app: FastAPI):
    """creates a temp local database to run the tests on"""
    SQLALCHEMY_DATABASE_URI_TEST = settings.SQLALCHEMY_DATABASE_URI

    engine = create_engine(SQLALCHEMY_DATABASE_URI_TEST, pool_pre_ping=True)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    close_all_sessions()
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        try:
            db = TestingSessionLocal()
            yield db
        finally:
            db.close()

    _app.dependency_overrides[get_db] = override_get_db

    # Create all tables in database.
    # Comment this out if you using migrations.
    # Base.metadata.create_all(bind=engine)

    return _app


app = database_clear_postgres(app)
client = TestClient(app)


def test_register():
    """test registration with a fresh account"""
    payload = {
        "email": "deadpool@example.com",
        "password": "chimichangas4life",
        "first_name": "Dead",
        "last_name": "Pool",
    }

    # register for the first time
    response = client.post("/auth/register", json=payload)
    assert response.status_code == 201, response.text
    data = response.json()
    assert "email" in data
    assert "first_name" in data
    assert "last_name" in data
    assert data["email"] == payload["email"]

    # try registration again with same credentials
    response = client.post("/auth/register", json=payload)
    assert response.status_code == 400, response.text
    data = response.json()
    assert data["detail"] == "email is taken"


def test_login_correct():
    """test correct credentials login"""
    payload = {
        "email": "deadpool@example.com",
        "password": "chimichangas4life"
    }
    response = client.post("/auth/login", json=payload)
    assert response.status_code == 200, response.text
    data = response.json()
    assert "jwt" in data


def test_login_incorrect():
    """test incorrect credentials login"""
    payload = {
        "email": "deadpool@example.com",
        "password": "notCorrectPass",
    }
    response = client.post("/auth/login", json=payload)
    assert response.status_code == 401, response.text
    data = response.json()
    assert "detail" in data
    assert data["detail"] == "Invalid username and/or password"


def test_protected_without_jwt():
    response = client.get("/auth/protected")
    assert response.status_code == 403, response.text
    data = response.json()
    assert "detail" in data
    assert data["detail"] == "Not authenticated"
