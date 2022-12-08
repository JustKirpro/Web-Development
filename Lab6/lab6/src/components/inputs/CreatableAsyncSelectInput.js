import {Controller} from "react-hook-form";
import AsyncCreatableSelect from "react-select/async-creatable";

const CreatableAsyncSelectInput = ({label, field, value, control, loadFunction, isMulti, isClearable, errorText}) => {
    const parseDefaultValues = () => {
        if (!value) {
            return "";
        }

        if (Array.isArray(value)) {
            const result = []
            value.map(v => result.push({label: v, value: v}));
            return result;
        }

        return {label: value, value: value};
    }

    return <>
        <label>{label}:</label>
        <Controller name={field} control={control} defaultValue={parseDefaultValues()} rules={{required: errorText}} render={({field, fieldState: {error}}) =>
            <>
                <AsyncCreatableSelect
                    className="form-input"
                    placeholder={label}
                    loadOptions={loadFunction}
                    {...field}
                    defaultValue={parseDefaultValues()}
                    defaultOptions
                    cacheOptions
                    isMulti={isMulti}
                    isClearable={isClearable}
                />
                {error && <p className="error-label">{error.message}</p>}
            </>
        } />
    </>
}

export default CreatableAsyncSelectInput;