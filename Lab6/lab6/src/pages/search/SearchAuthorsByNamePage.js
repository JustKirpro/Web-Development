import {useState} from "react";
import {toast} from "react-toastify";
import AuthorList from "../../components/AuthorList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import getAuthorsByName from "../../api/authors/getAuthorsByName";

const SearchAuthorsByNamePage = () => {
    const [authors, setAuthors] = useState([]);
    const [pattern, setPattern] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const onSearchClick = () => {
        if (!pattern) {
            toast.error('Введите имя для поиска');
            return;
        }

        setShowResult(true);
        getAuthorsByName(pattern)
            .then(response => setAuthors(response.data))
            .catch(() => toast.error('При поиске авторов произошла ошибка!'));
    }

    return <div>
        <h1>Поиск авторов по имени</h1>
        <div>
            <input className="form-input" type="text" placeholder="Поиск..." onChange={event => setPattern(event.target.value)} />
            <button className="button" style={{color:"lightskyblue"}} onClick={onSearchClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
        {showResult ? <AuthorList authors={authors} /> : null }
    </div>
}

export default SearchAuthorsByNamePage;