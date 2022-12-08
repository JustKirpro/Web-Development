const DateInput = ({value, label, field, register }) => {
    return <>
        <label>{label}:</label>
        <input className='form-input' defaultValue={value} type='date' {...register(field)} />
    </>
}

export default DateInput;