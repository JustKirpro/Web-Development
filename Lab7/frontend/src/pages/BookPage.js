import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import getBookById from "../api/books/getBookById";
import deleteBook from "../api/books/deleteBook";

const BookPage = () => {
    const [book, setBook] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getBookById(id)
            .then(response => setBook(response.data))
            .catch(() => toast.error("При загрузке книги произошла ошибка"))
    }, []);

    const onDeleteClick = () => {
        deleteBook(id)
            .then(response => {
                if (response.status === 200) {
                    toast.success(`Книга c названием ${book.title} была успешно удалена!`);
                    navigate(-1);
                }
            })
            .catch(() => {toast.error("При удалении книги произошла ошибка");});
    }

    const onEditClick = () => {
        navigate(`/books/${id}/edit`);
    }

    if (!book) {
        return;
    }

    return <div className="page">
        <div className="info">
            <h2>{book.title}</h2>
            <p>Язык: {book.language}</p>
            {book.authors.length === 1
                ? <p>Автор: {book.authors[0]}</p>
                : <p>Авторы:<ul>{book.authors.map(author => <li>{author}</li>)}</ul></p>
            }
            <p>Год выхода: {book.release_year ? book.release_year : "не указан"}</p>
            <p>Статус: {book.is_read ? "прочитана" : "в списке для прочтения"}</p>
        </div>
        <div>
            <button className="button" style={{color: "orange"}} onClick={onEditClick}>Редактировать</button>
            <button className="button" style={{color: "red"}} onClick={onDeleteClick}>Удалить</button>
        </div>
    </div>
}

export default BookPage;