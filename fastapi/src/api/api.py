from fastapi import APIRouter
from api.routers.health_router import health_router

api_router = APIRouter()
api_router.include_router(health_router, prefix="/health", tags=["health"])
