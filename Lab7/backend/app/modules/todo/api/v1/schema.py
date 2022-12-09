from datetime import date
from typing import List
from pydantic import BaseModel, Extra


class PostBookModel(BaseModel, extra=Extra.forbid):
    title: str
    authors: List[str]
    release_year: int | None = None
    is_read: bool | None = False
    language: str


class PutBookModel(BaseModel, extra=Extra.forbid):
    title: str | None = None
    authors: List[str] | None = None
    release_year: int | None = None
    is_read: bool | None = None
    language: str | None = None


class OutputBookModel(BaseModel, extra=Extra.forbid):
    book_id: int
    title: str
    authors: List[str]
    release_year: int | None = None
    is_read: bool
    language: str


class PostAuthorModel(BaseModel, extra=Extra.forbid):
    name: str
    languages: List[str] | None = None
    birthday: date | None = None
    biography: str | None = None


class PutAuthorModel(BaseModel, extra=Extra.forbid):
    name: str | None = None
    languages: List[str] | None = None
    birthday: date | None = None
    biography: str | None = None


class OutputAuthorModel(BaseModel, extra=Extra.forbid):
    author_id: int
    name: str
    languages: List[str]
    birthday: date | None = None
    biography: str | None = None
