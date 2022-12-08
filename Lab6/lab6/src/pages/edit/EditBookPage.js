import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import EditBookForm from "../../components/forms/EditBookForm";
import getBookById from "../../api/books/getBookById";
import {useForm} from "react-hook-form";
import {updateBook} from "../../api/books/updateBook";

const EditBookPage = () => {
    const { register, control, handleSubmit, formState: { errors, isValid } } = useForm({mode: "onBlur"});
    const [book, setBook] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getBookById(id)
            .then(response => setBook(response.data))
            .catch(() => toast.error("При загрузке книги произошла ошибка"))
    }, []);

    const preprocessData = (data) => {
        let updatedBook = {};

        if (data.title !== book.title) {
            updatedBook.title = data.title;
        }

        updatedBook.authors = data.authors.map(author => author.value);

        if (data.language.value !== book.language) {
            updatedBook.language = data.language.value;
        }

        updatedBook.is_read = data.is_read.value;

        if (data.release_year !== "") {
            updatedBook.release_year = data.release_year;
        }

        return updatedBook;
    }

    const onSubmit = (data) => {
        const updatedBook = preprocessData(data);
        console.log(updatedBook);

        updateBook(id, updatedBook)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Книга была успешно обновлена!");
                    navigate(-1);
                }
            })
            .catch(() => {
                toast.error("Книга с таким названием уже существует");
            })
    }

    if (!book) {
        return null;
    }

    return <EditBookForm book={book} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} control={control} errors={errors} isValid={isValid} />
}

export default EditBookPage;