import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {toast} from "react-toastify";
import {getAuthorById} from "../api/authors/getAuthorById";
import {deleteAuthor} from "../api/authors/deleteAuthor";
import QRCode from "qrcode";

const isURL = (str) => {
    if (!str) {
        return false;
    }

    return str.startsWith('https://');
}

const AuthorPage = () => {
    const [author, setAuthor] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const qrcodeCanvasRef = useRef();

    useEffect(() => {
        getAuthorById(id)
            .then(response => setAuthor(response.data))
            .catch(() => toast.error("При загрузке книги произошла ошибка"))
    }, []);

    useEffect(() => {
        if (author?.biography && isURL(author.biography)) {
            QRCode.toCanvas(qrcodeCanvasRef.current, author.biography);
        }
    }, [author?.biography]);

    const onDeleteClick = () => {
        deleteAuthor(id)
            .then(response => {
                if (response.status === 200) {
                    toast.success(`Автор с именем ${author.name} был успешно удалён!`);
                    navigate(-1);
                }
            })
            .catch(() => {toast.error("При удалении автора произошла ошибка");});
    }

    const onEditClick = () => {
        navigate(`/authors/${id}/edit`);
    }

    if (!author) {
        return;
    }

    return <div className="page">
        <div className="info">
            <h2>{author.name}</h2>
            {author.languages.length === 0 ? null :
                ( author.languages.length === 1
                    ? <p>Язык: {author.languages[0]}</p>
                    : <p>Языки:<ul>{author.languages.map(language => <li>{language}</li>)}</ul></p>
                )}
            <p>Дата рождения: {author.birthday ? author.birthday : "не указана"}</p>
            {isURL(author.biography) ? <canvas ref={qrcodeCanvasRef}/>
            : <p>Биография: {author.biography ? author.biography : "не указана"}</p>
            }
        </div>
        <div>
            <button className="button" style={{color: "orange"}} onClick={onEditClick}>Редактировать</button>
            <button className="button" style={{color: "red"}} onClick={onDeleteClick}>Удалить</button>
        </div>
    </div>
}

export default AuthorPage;