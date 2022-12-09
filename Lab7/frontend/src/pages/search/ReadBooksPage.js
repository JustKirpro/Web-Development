import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import BookList from "../../components/BookList";
import {getReadBooks} from "../../api/books/getReadBooks";

const ReadBooksPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getReadBooks()
            .then(response => setBooks(response.data))
            .catch(() => toast.error('При загрузке списка книг произошла ошибка'))
            }, []);

    return <div>
        <h1>Прочитанные книги</h1>
        <BookList books={books} />
    </div>
}

export default ReadBooksPage;