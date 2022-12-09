const NumberInput = ({label, field, value, save, register, minValue, maxValue, errorText, errors}) => {
    const handleChange = (e) => {
        if (save) {
            save(e.target.value);
        }
    }

    return <>
        <label>{label}:</label>
        <input className="form-input" type="number" defaultValue={value} {...register(field, {min: minValue, max: maxValue})} onChange={handleChange} />
        {errors[field] && <p className="error-label">{errorText}</p>}
    </>
}

export default NumberInput;