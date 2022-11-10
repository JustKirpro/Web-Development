from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Table

from app.common.db import Base

author_book_table = Table(
    "author_book",
    Base.metadata,
    Column("author_id", ForeignKey("author.author_id", ondelete="CASCADE")),
    Column("book_id", ForeignKey("book.book_id", ondelete="CASCADE"))
)

author_language_table = Table(
    "author_language",
    Base.metadata,
    Column("author_id", ForeignKey("author.author_id", ondelete="CASCADE")),
    Column("language_id", ForeignKey("language.language_id", ondelete="CASCADE"))
)


class Author(Base):
    __tablename__ = "author"

    author_id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False, unique=True)
    birthday = Column(Date)
    biography = Column(Text)

    books = relationship("Book", author_book_table, lazy="dynamic", backref="authors")
    languages = relationship("Language", author_language_table, backref="authors")
