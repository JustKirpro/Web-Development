import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import BookList from "../../components/BookList";
import AsyncSelect from "react-select/async";
import getLanguages from "../../api/languages/getLanguages";
import {getToReadBooks} from "../../api/books/getToReadBooks";

const ToReadBooksPage = () => {
    const [books, setBooks] = useState([]);

    const [language, setLanguage] = useState(null)

    useEffect(() => {
        getToReadBooks(language)
            .then(response => setBooks(response.data))
            .catch(() => toast.error('При загрузке списка книг произошла ошибка'))
    }, [language]);

    const handleChange = (language, event) => {
        const value = event.action === "clear" ? null : language.value;
        setLanguage(value);
    }

    return <div>
        <h1>Запланированные книги</h1>
        <AsyncSelect className="form-input" placeholder='Язык' onChange={handleChange} loadOptions={getLanguages} defaultOptions cacheOptions isClearable />
        <BookList books={books} />
    </div>
}

export default ToReadBooksPage;