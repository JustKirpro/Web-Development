from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from app.modules.todo.models import Book, Author, Language
from app.modules.todo.api.v1.schema import PostBookModel, PutBookModel, OutputBookModel
from app.modules.todo.api.v1.schema import PostAuthorModel, PutAuthorModel, OutputAuthorModel
from app.common.db import get_db

router = APIRouter()


@router.post("/books")
def post_book(book: PostBookModel, session: Session = Depends(get_db)):
    existed_book = session.query(Book).filter(Book.title == book.title).first()
    if existed_book is not None:
        return JSONResponse(status_code=409, content={"message": f"Книга с названием {book.title} уже существует"})

    language_id = get_language_id(book.language, session)
    new_book = Book(title=book.title, release_year=book.release_year, is_read=book.is_read, language_id=language_id)
    add_and_commit(new_book, session)
    add_authors(new_book, book.authors, session)
    return JSONResponse(status_code=200, content={"message": "Успешно"})


@router.post("/authors")
def post_author(author: PostAuthorModel, session: Session = Depends(get_db)):
    existed_author = session.query(Author).filter(Author.name == author.name).first()
    if existed_author is not None:
        return JSONResponse(status_code=409, content={"message": f"Автор с именем {author.name} уже существует"})

    new_author = Author(name=author.name, birthday=author.birthday, biography=author.biography)
    add_and_commit(new_author, session)

    if author.languages is not None:
        add_languages(new_author, author.languages, session)

    return JSONResponse(status_code=200, content={"message": "Успешно"})


@router.put("/books/{book_id}")
def put_book(book: PutBookModel, book_id: int, session: Session = Depends(get_db)):
    existed_book = session.query(Book).filter(Book.book_id == book_id).first()
    if existed_book is None:
        return JSONResponse(status_code=404, content={"message": f"Книга с ID {book_id} не существует"})

    if book.title is not None:
        same_title_book = session.query(Book).filter(Book.title == book.title).first()
        if same_title_book is None:
            existed_book.title = book.title
        else:
            return JSONResponse(status_code=409, content={"message": f"Книга с названием {book.title} уже существует"})

    if book.authors is not None:
        existed_book.authors.clear()
        add_authors(existed_book, book.authors, session)

    if book.is_read is not None:
        existed_book.is_read = book.is_read

    if book.release_year is not None:
        existed_book.release_year = book.release_year

    if book.language is not None:
        existed_book.language_id = get_language_id(book.language, session)

    session.commit()
    return JSONResponse(status_code=200, content={"message": "Успешно"})


@router.put("/authors/{author_id}")
def put_author(author_id: int, author: PutAuthorModel, session: Session = Depends(get_db)):
    existed_author = session.query(Author).filter(Author.author_id == author_id).first()
    if existed_author is None:
        return JSONResponse(status_code=404, content={"message": f"Автор с ID {author_id} не существует"})

    if author.name is not None:
        same_name_author = session.query(Author).filter(Author.name == author.name).first()
        if same_name_author is None:
            existed_author.name = author.name
        else:
            return JSONResponse(status_code=409, content={"message": f"Автор с именем {author.name} уже существует"})

    if author.languages is not None:
        existed_author.languages.clear()
        add_languages(existed_author, author.languages, session)

    if author.birthday is not None:
        existed_author.birthday = author.birthday

    if author.biography is not None:
        existed_author.biography = author.biography

    session.commit()
    return JSONResponse(status_code=200, content={"message": "Успешно"})


@router.delete("/books/{book_id}")
def delete_book(book_id: int, session: Session = Depends(get_db)):
    existed_book = session.query(Book).filter(Book.book_id == book_id).first()
    if existed_book is None:
        return JSONResponse(status_code=404, content={"message": f"Книги с ID {book_id} не существует"})

    session.delete(existed_book)
    session.commit()
    return JSONResponse(status_code=200, content={"message": "Успешно"})


@router.delete("/authors/{author_id}")
def delete_author(author_id: int, session: Session = Depends(get_db)):
    existed_author = session.query(Author).filter(Author.author_id == author_id).first()
    if existed_author is None:
        return JSONResponse(status_code=404, content={"message": f"Автора с ID {author_id} не существует"})

    session.delete(existed_author)
    session.commit()
    return JSONResponse(status_code=200, content={"message": "Успешно"})


@router.get("/books/read")
def get_read_books(session: Session = Depends(get_db)):
    books = session.query(Book).filter(Book.is_read).all()

    result = []
    for book in books:
        authors = [author.name for author in book.authors]
        result.append(OutputBookModel(book_id=book.book_id, title=book.title, authors=authors, release_year=book.release_year, is_read=book.is_read, language=book.language.name))
    return result


@router.get("/books/to_read")
def get_to_read_books(language: str | None = None, session: Session = Depends(get_db)):
    if language is not None:
        existed_language = session.query(Language).filter(Language.name == language).first()
        if existed_language is None:
            books = []
        else:
            books = session.query(Book).filter(Book.is_read == False, Book.language == existed_language).all()
    else:
        books = session.query(Book).filter(Book.is_read == False).all()

    result = []
    for book in books:
        authors = [author.name for author in book.authors]
        result.append(OutputBookModel(book_id=book.book_id, title=book.title, authors=authors, release_year=book.release_year, is_read=book.is_read, language=book.language.name))

    return result


@router.get("/books/")
def get_books_by_title(title: str, session: Session = Depends(get_db)):
    books = session.query(Book).filter(Book.title.like(f"%{title}%")).all()
    result = []
    for book in books:
        authors = [author.name for author in book.authors]
        result.append(OutputBookModel(book_id=book.book_id, title=book.title, authors=authors, release_year=book.release_year, is_read=book.is_read, language=book.language.name))
    return result


@router.get("/books/{book_id}")
def get_book_by_id(book_id: int, session: Session = Depends(get_db)):
    book = session.query(Book).filter(Book.book_id == book_id).first()
    if book is None:
        return JSONResponse(status_code=404, content={"message": f"Книги с ID {book_id} не существует"})

    authors = [author.name for author in book.authors]
    return OutputBookModel(book_id=book.book_id, title=book.title, authors=authors, release_year=book.release_year, is_read=book.is_read, language=book.language.name)


@router.get("/authors/")
def get_authors_by_name(name: str, session: Session = Depends(get_db)):
    authors = session.query(Author).filter(Author.name.like(f"%{name}%")).all()
    result = []
    for author in authors:
        languages = [language.name for language in author.languages]
        result.append(OutputAuthorModel(author_id=author.author_id, name=author.name, languages=languages, birthday=author.birthday, biography=author.biography))
    return result


@router.get("/authors/all")
def get_all_authors(session: Session = Depends(get_db)):
    return session.query(Author.name).all()


@router.get("/authors/{author_id}")
def get_author_by_id(author_id: int, session: Session = Depends(get_db)):
    author = session.query(Author).filter(Author.author_id == author_id).first()
    if author is None:
        return JSONResponse(status_code=404, content={"message": f"Автора с ID {author_id} не существует"})

    languages = [language.name for language in author.languages]
    return OutputAuthorModel(author_id=author.author_id, name=author.name, languages=languages, birthday=author.birthday, biography=author.biography)


@router.get("/languages/all")
def get_all_languages(session: Session = Depends(get_db)):
    return session.query(Language.name).all()


@router.get("/authors/{name}/books")
def get_books_by_author_language_and_status(name: str, language: str | None = None, is_read: bool | None = None, session: Session = Depends(get_db)):
    existed_author = session.query(Author).filter(Author.name == name).first()
    if existed_author is None:
        return JSONResponse(status_code=404, content={"message": f"Автор с именем {name} не существует!"})

    if language is not None:
        existed_language = session.query(Language).filter(Language.name == language).first()

        if existed_language is None:
            return JSONResponse(status_code=404, content={"message": f"Язык {language} не существует!"})

        if is_read is None:
            books = existed_author.books.filter(Book.language_id == existed_language.language_id)
        else:
            books = existed_author.books.filter(Book.language_id == existed_language.language_id, Book.is_read == is_read)
    else:
        if is_read is None:
            books = existed_author.books
        else:
            books = existed_author.books.filter(Book.is_read == is_read)

    result = []
    for book in books:
        authors = [author.name for author in book.authors]
        result.append(OutputBookModel(book_id=book.book_id, title=book.title, authors=authors, release_year=book.release_year, is_read=book.is_read, language=book.language.name))

    return result


def add_and_commit(entity, session):
    session.add(entity)
    session.commit()
    session.refresh(entity)


def add_authors(book, authors, session):
    for book_author in set(authors):
        author = session.query(Author).filter(Author.name == book_author).first()
        if author is None:
            author = Author(name=book_author)
            session.add(author)
        author.books.append(book)
    session.commit()


def add_languages(author, languages, session):
    for author_language in set(languages):
        language = session.query(Language).filter(Language.name == author_language).first()
        if language is None:
            language = Language(name=author_language)
            session.add(language)
        author.languages.append(language)
    session.commit()


def get_language_id(book_language, session):
    language = session.query(Language).filter(Language.name == book_language).first()
    if language is None:
        language = Language(name=book_language)
        add_and_commit(language, session)
    return language.language_id
