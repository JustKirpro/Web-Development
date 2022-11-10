from sqlalchemy import Column, Integer, String

from app.common.db import Base


class Language(Base):
    __tablename__ = "language"

    language_id = Column(Integer, primary_key=True)
    name = Column(String(64), nullable=False, unique=True)
