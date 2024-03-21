from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
import os

app = FastAPI()

supabase_url = os.environ["SUPABASE_URL"]
supabase_key = os.environ["SUPABASE_KEY"]
supabase: Client = create_client(supabase_url, supabase_key)

security = HTTPBearer()


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        jwt_token = credentials.credentials
        user = supabase.auth.get_user(jwt_token)
        return user

    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Invalid token")

user_dependency = Depends(get_current_user)
