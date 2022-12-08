import {useForm} from 'react-hook-form';
import {toast} from "react-toastify";
import AddBookForm from "../../components/forms/AddBookForm";
import postBook from "../../api/books/postBook";
import {useBook} from "../../hooks/useBook";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const AddBookPage = () => {
    const savedBook = useBook();
    const { register, control, handleSubmit, watch, formState: { errors, isValid } } = useForm({mode: "onBlur"});
    const authorWatcher = watch("authors");
    const languageWatcher = watch("language");
    const statusWatcher = watch("is_read");
    const navigate = useNavigate();

    useEffect(() => {
        if (authorWatcher) {
            savedBook.setAuthors(authorWatcher.map(author => author.value));
        }
    }, [authorWatcher]);

    useEffect(() => {
        if (languageWatcher) {
            savedBook.setLanguage(languageWatcher.value);
        }
    }, [languageWatcher]);

    useEffect(() => {
        if (statusWatcher) {
            savedBook.setStatus(statusWatcher.value);
        }
    }, [statusWatcher]);

    const preprocessData = () => {
        const book = {
            title: savedBook.title,
            authors: savedBook.authors,
            language: savedBook.language,
            is_read: savedBook.status
        };

        if (savedBook.year) {
            book.release_year = savedBook.year;
        }

        return book;
    }
    const onSubmit = () => {
        const book = preprocessData();
        console.log(book);

        postBook(book)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Книга была успешно добавлена!");
                    savedBook.setTitle(null);
                    savedBook.setAuthors(null);
                    savedBook.setYear(null);
                    savedBook.setLanguage(null);
                    savedBook.setStatus(false);
                    navigate(-1);
                }
            })
            .catch(() => {toast.error("Книга с таким названием уже существует")})
    }

    return <AddBookForm book={savedBook} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} control={control} errors={errors} isValid={isValid} />
}

export default AddBookPage;