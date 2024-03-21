from fastapi import APIRouter, Depends
from db.client import db_dependency
from utils.auth import user_dependency


health_router = APIRouter()


@health_router.get("/")
async def health():
    return {"status": "ok"}


@health_router.get("/users")
async def get_users(db_and_base: tuple = db_dependency):
    db, Base = db_and_base
    users = db.query(Base.classes.users).all()
    return users

# protected route test


@health_router.get("/protected")
async def protected_route(user=user_dependency):
    if user is None:
        return {"message": "You are not authorized to access this route"}
    user_dict = dict(user.user)
    email, id = user_dict["email"], user_dict["id"]
    print(f"User {email} with id {id} accessed the protected route")
    return {"message": "You are authorized to access this route"}
