from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, backref

from app.common.db import Base


class Book(Base):
    __tablename__ = "book"

    book_id = Column(Integer, primary_key=True)
    title = Column(String(128), nullable=False, unique=True)
    release_year = Column(Integer)
    is_read = Column(Boolean, default=0)
    language_id = Column(Integer, ForeignKey("language.language_id"))

    language = relationship("Language", backref=backref("books", cascade="all,delete"))
