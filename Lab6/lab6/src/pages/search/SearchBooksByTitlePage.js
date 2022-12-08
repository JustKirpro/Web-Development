import {useState} from "react";
import {toast} from "react-toastify";
import BookList from "../../components/BookList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import getBooksByTitle from "../../api/books/getBooksByTitle";

const SearchBooksByTitlePage = () => {
    const [books, setBooks] = useState([]);
    const [pattern, setPattern] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const onSearchClick = () => {
        if (!pattern) {
            toast.error('Введите название для поиска');
            return;
        }

        setShowResult(true);
        getBooksByTitle(pattern)
            .then(response => setBooks(response.data))
            .catch(() => toast.error('При поиске книг произошла ошибка!'));
    }

    return <div>
        <h1>Поиск книг по названию</h1>
        <div>
            <input className="form-input" type="text" placeholder="Поиск..." onChange={event => setPattern(event.target.value)} />
            <button className="button" style={{color:"lightskyblue"}} onClick={onSearchClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
        {showResult ? <BookList books={books} /> : null }
    </div>
}

export default SearchBooksByTitlePage;