import TextInput from "../inputs/TextInput";
import CreatableAsyncSelectInput from "../inputs/CreatableAsyncSelectInput";
import getLanguages from "../../api/languages/getLanguages";
import DateInput from "../inputs/DateInput";

const EditAuthorForm = ({author, handleSubmit, onSubmit, register, control, errors, isValid}) => {
    return <div>
        <h1>Редактирование автора</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <TextInput label='Имя' field='name' value={author.name} register={register} errors={errors} errorText='У автора должно быть имя.' />
            <CreatableAsyncSelectInput label='Язык' field='languages' value={author.languages} control={control} loadFunction={getLanguages} isMulti />
            <DateInput label='Дата рождения' field='birthday' value={author.birthday} register={register} errors={errors} />
            <TextInput label='Биография' field='biography' value={author.biography} register={register} errors={errors} />
            <input className="button" type="submit" value="Обновить" disabled={!isValid} />
        </form>
    </div>
}

export default EditAuthorForm;