import {useState} from "react";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AsyncSelect from "react-select/async";
import Select from 'react-select';
import BookList from "../../components/BookList";
import {getAuthors} from "../../api/authors/getAuthors";
import getLanguages from "../../api/languages/getLanguages";
import getBooksByAuthor from "../../api/books/getBooksByAuthor";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {statuses} from "../../statuses";

const SearchBooksByAuthorPage = () => {
    const [author, setAuthor] = useState(null);
    const [language, setLanguage] = useState(null);
    const [status, setStatus] = useState(null);
    const [books, setBooks] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const handleAuthorChange = (author, event) => {
        if (event.action === "clear") {
            setAuthor(null);
            setShowResult(false);
            return;
        }

        setAuthor(author.value);
    }

    const handleLanguageChange = (language, event) => {
        const value = event.action === "clear" ? null : language.value;
        setLanguage(value);
    }

    const handleStatusChange = (status, event) => {
        const value = event.action === "clear" ? null : status.value;
        setStatus(value);
    }

    const onSearchClick = () => {
        if (!author) {
            toast.error("Выберите автора");
            return;
        }

        setShowResult(true);
        getBooksByAuthor(author, language, status)
            .then(response => setBooks(response.data))
            .catch(() => toast.error("При поиске книг произошла ошибка!"));
    }

    return <div>
        <h1>Поиск книг автора</h1>
        <div style={{display: "flex"}}>
            <AsyncSelect className="form-input" onChange={handleAuthorChange} placeholder="Автор" loadOptions={getAuthors} defaultOptions cacheOptions isClearable />
            <AsyncSelect className="form-input" onChange={handleLanguageChange} placeholder="Язык" loadOptions={getLanguages} isDisabled={!author} defaultOptions cacheOptions isClearable />
            <Select className="form-input" onChange={handleStatusChange} placeholder="Статус" options={statuses} isDisabled={!author} isClearable />
            <button className="button" style={{color:"lightskyblue"}} onClick={onSearchClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
        {showResult ? <BookList books={books} /> : null }
    </div>
}

export default SearchBooksByAuthorPage;