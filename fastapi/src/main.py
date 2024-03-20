from fastapi import FastAPI
from api.api import api_router

def create_application() -> FastAPI:
    application = FastAPI(title="Your Project Name", version="0.1.0")
    application.include_router(api_router)
    return application


app = create_application()
