import {useForm} from 'react-hook-form';
import {toast} from "react-toastify";
import AddAuthorForm from "../../components/forms/AddAuthorForm";
import {postAuthor} from "../../api/authors/postAuthor";

const AddAuthorPage = () => {
    const { register, control, handleSubmit, formState: { isValid, errors } } = useForm({mode: "onBlur"});

    const preprocessData = (data) => {
        const author = {
            name: data.name,
        };

        if (data.languages) {
            author.languages = data.languages.map(language => language.value);
        }

        if (data.birthday) {
            author.birthday = data.birthday;
        }

        if (data.biography) {
            author.biography = data.biography;
        }

        return author;
    }

    const onSubmit = (data) => {
        const author = preprocessData(data);

        postAuthor(author)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Автор был успешно добавлен!");
                }
            })
            .catch(() => {toast.error("Автор с таким именем уже сущесвует")})
    }

    return <AddAuthorForm handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} control={control} errors={errors} isValid={isValid} />
}

export default AddAuthorPage;