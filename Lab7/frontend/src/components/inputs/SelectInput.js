import {Controller} from "react-hook-form";
import Select from "react-select";

const SelectInput = ({label, field, value, control, options}) => {
    const parseDefaultValue = () => {
        if (!value) {
            return {label: "планируется", value: false};
        } else {
            return {label: "прочитана", value: true};
        }
    }

    return <>
        <label>{label}:</label>
        <Controller name={field} control={control} defaultValue={parseDefaultValue()} render={({field}) =>
            <Select
                className="form-input"
                {...field}
                options={options}
                defaultValue={parseDefaultValue()}
            />
        } />
    </>
}

export default SelectInput;