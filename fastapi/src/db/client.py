from fastapi import Depends
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import sessionmaker
import os

db_url = os.environ.get("SUPABASE_DB_URL")
print(db_url)


engine = create_engine(db_url, pool_size=20, max_overflow=0)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

metadata = MetaData()

#here we need to setup the schema
metadata.reflect(bind=engine, schema="schema")

Base = automap_base(metadata=metadata)

Base.prepare()
print(Base.classes.keys())


def get_db():
    db = SessionLocal()
    try:
        yield (db, Base)
    finally:
        db.close()


db_dependency = Depends(get_db)
