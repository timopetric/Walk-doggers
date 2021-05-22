from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import close_all_sessions

from app.config import settings
from app.functions import get_db
from app.main import app
from app.postgres import Base
import json
import os
from app.postgres import actions
from app.auth import AuthHandler


def database_clear_postgres(_app: FastAPI):
    """creates a temp local database to run the tests on"""

    def override_get_db():
        try:
            db = TestingSessionLocal()
            yield db
        finally:
            db.close()

    SQLALCHEMY_DATABASE_URI_TEST = settings.SQLALCHEMY_DATABASE_URI

    engine = create_engine(SQLALCHEMY_DATABASE_URI_TEST, pool_pre_ping=True)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # drop postgres database
    close_all_sessions()
    # Base.metadata.drop_all(engine)
    Base.metadata.create_all(bind=engine)

    # create admin user
    auth_handler = AuthHandler()
    with TestingSessionLocal() as db:
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
        "first_name": "Dead",
        "last_name": "Pool",
        "password": "chimichangas4#Life",
    }

    # register for the first time
    response = client.post("/auth/register", json=payload)
    assert response.status_code == 201, response.text
    data = response.json()
    assert "jwt" in data

    # try registration again with same credentials
    response = client.post("/auth/register", json=payload)
    assert response.status_code == 400, response.text
    data = response.json()
    assert data["detail"] == "email is taken"


def test_login_correct():
    """test correct credentials login"""
    payload = {
        "email": "deadpool@example.com",
        "password": "chimichangas4#Life"
    }
    response = client.post("/auth/login", json=payload)
    assert response.status_code == 200, response.text
    data = response.json()
    assert "jwt" in data
    global jwt
    jwt = data["jwt"]


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


def get_jwt_header(jwt: str):
    return {"Authorization": f"Bearer {jwt}"}


def test_protected_with_jwt():
    response = client.get("/auth/protected", headers=get_jwt_header(jwt))
    assert response.status_code == 200, response.text
    data = response.json()
    assert "user_id" in data


def test_update_user():
    response = client.put("/auth/update_user", data=json.dumps({
        "first_name": "Andzraz",
        "last_name": "Test"
    }), headers=get_jwt_header(jwt))
    assert response.status_code == 200, response.text
    data = response.json()
    assert "first_name" in data
    assert "last_name" in data
    assert data["first_name"] == "Andzraz"
    assert data["last_name"] == "Test"


def test_get_roles():
    response = client.get("/auth/roles", headers=get_jwt_header(jwt))
    assert response.status_code == 200, response.text
    data = response.json()
    assert "admin" in data
    assert "moderator" in data
    assert "reporter" in data
    assert data["admin"] is False
    assert data["moderator"] is False
    assert data["reporter"] is False


def test_become_reporter():
    response = client.post("/auth/roles/become_reporter", headers=get_jwt_header(jwt))
    assert response.status_code == 200, response.text
    data = response.json()
    assert "admin" in data
    assert "moderator" in data
    assert "reporter" in data
    assert data["admin"] is False
    assert data["moderator"] is False
    assert data["reporter"] is True


def test_get_admin_jwt():
    admin_mod_email = os.environ.get("ADMIN_MOD_EMAIL", "")
    admin_mod_pass = os.environ.get("ADMIN_MOD_PASS", "")
    admin_mod_first_name = os.environ.get("ADMIN_MOD_FIRST_NAME", "")
    admin_mod_last_name = os.environ.get("ADMIN_MOD_LAST_NAME", "")
    assert admin_mod_email != ""
    assert admin_mod_pass != ""
    assert admin_mod_first_name != ""
    assert admin_mod_last_name != ""
    payload = {
        "email": admin_mod_email,
        "password": admin_mod_pass,
    }
    print(payload)
    response = client.post("/auth/login", json=payload)
    assert response.status_code == 200, response.text
    data = response.json()
    assert "jwt" in data
    global jwtAdmin
    jwtAdmin = data["jwt"]


def test_protected_admin():
    response = client.get("/auth/protected/admin", headers=get_jwt_header(jwtAdmin))
    assert response.status_code == 200, response.text
    data = response.json()
    assert "status" in data
    assert data["status"] == "ok"


def test_protected_moderator():
    """test incorrect credentials login"""
    response = client.get("/auth/protected/moderator", headers=get_jwt_header(jwtAdmin))
    assert response.status_code == 200, response.text
    data = response.json()
    assert "status" in data
    assert data["status"] == "ok"


def test_protected_reporter():
    response = client.get("/auth/protected/reporter", headers=get_jwt_header(jwt))
    assert response.status_code == 200, response.text
    data = response.json()
    assert "status" in data
    assert data["status"] == "ok"
