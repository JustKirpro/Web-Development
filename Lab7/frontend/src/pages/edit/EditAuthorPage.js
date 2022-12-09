import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {getAuthorById} from "../../api/authors/getAuthorById";
import {updateAuthor} from "../../api/authors/updateAuthor";
import EditAuthorForm from "../../components/forms/EditAuthorForm";

const EditAuthorPage = () => {
    const { register, control, handleSubmit, formState: { errors, isValid } } = useForm({mode: "onBlur"});
    const [author, setAuthor] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAuthorById(id)
            .then(response => setAuthor(response.data))
            .catch(() => {toast.error("При загрузке автора произошла ошибка")})
    }, []);

    const preprocessData = (data) => {
        let updatedAuthor = {};

        if (data.name !== author.name) {
            updatedAuthor.name = data.name;
        }

        if (data.languages) {
            updatedAuthor.languages = data.languages.map(language => language.value);
        }

        if (data.birthday !== author.language) {
            updatedAuthor.birthday = data.birthday;
        }

        if (data.biography !== author.biography) {
            updatedAuthor.biography = data.biography;
        }

        return updatedAuthor;
    }

    const onSubmit = (data) => {
        const updatedAuthor = preprocessData(data);

        updateAuthor(id, updatedAuthor)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Автор был успешно обновлён!");
                    navigate(-1);
                }
            })
            .catch(() => {toast.error("Автор с таким именем уже существует");
            })
    }

    if (!author) {
        return null;
    }

    return <EditAuthorForm author={author} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} control={control} errors={errors} isValid={isValid} />
}

export default EditAuthorPage;