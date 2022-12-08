const TextInput = ({value, label, field, save, register, errors, errorText}) => {
    const handleChange = (e) => {
        if (save) {
            save(e.target.value)
        }
    }

    return <>
        <label>{label}:</label>
        <input className="form-input" defaultValue={value} {...register(field, {required: errorText})} onChange={handleChange}/>
        {errors[field] && <p className="error-label">{errors[field].message}</p>}
    </>
}

export default TextInput;