import TextInput from "../inputs/TextInput";
import CreatableAsyncSelectInput from "../inputs/CreatableAsyncSelectInput";
import getLanguages from "../../api/languages/getLanguages";
import DateInput from "../inputs/DateInput";

const AddAuthorForm = ({handleSubmit, onSubmit, register, control, errors, isValid}) => {
    return <div>
        <h1>Добавление нового автора</h1>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <TextInput label='Имя' field='name' register={register} errors={errors} errorText='У автора должно быть имя.' />
            <CreatableAsyncSelectInput label='Язык' field='languages' control={control} loadFunction={getLanguages} isMulti/>
            <DateInput label='Дата рождения' field='birthday' register={register} errors={errors} />
            <TextInput label='Биография' field='biography' register={register} errors={errors} />
            <input className="button" type="submit" value="Добавить" disabled={!isValid} />
        </form>
    </div>
}

export default AddAuthorForm;