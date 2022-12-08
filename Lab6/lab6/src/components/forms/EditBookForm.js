import TextInput from "../inputs/TextInput";
import CreatableAsyncSelectInput from "../inputs/CreatableAsyncSelectInput";
import {getAuthors} from "../../api/authors/getAuthors";
import NumberInput from "../inputs/NumberInput";
import getLanguages from "../../api/languages/getLanguages";
import SelectInput from "../inputs/SelectInput";
import {statuses} from "../../statuses";

const EditBookForm = ({book, handleSubmit, onSubmit, register, control, errors, isValid}) => {
    return <div>
        <h1>Редактирование книги</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <TextInput label='Название' field='title' value={book.title} register={register} errors={errors} errorText='У книги должно быть название.' />
            <CreatableAsyncSelectInput label='Автор' field='authors' value={book.authors} control={control} loadFunction={getAuthors} isMulti errorText='У книги должен быть хотя бы один автор.' />
            <NumberInput label='Год выхода' field='release_year' value={book.release_year} register={register} minValue={0} maxValue={2022} errors={errors} errorText='Год выхода книги должен быть в пределах от 0 до 2022.' />
            <CreatableAsyncSelectInput label='Язык' field='language' value={book.language} control={control} loadFunction={getLanguages} isClearable errorText='У книги должен быть выбран язык.' />
            <SelectInput label='Статус' field='is_read' value={book.is_read} control={control} options={statuses} />
            <input className="button" type="submit" value="Подтвердить" disabled={!isValid} />
        </form>
    </div>
}

export default EditBookForm;