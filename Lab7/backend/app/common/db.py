import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from starlette.requests import Request


def create_db_engine():
    url = os.getenv('DATABASE_URL')
    return create_engine(url, echo=True)


def create_session_factory(engine):
    return sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db(request: Request):
    return request.state.db


Base = declarative_base()
