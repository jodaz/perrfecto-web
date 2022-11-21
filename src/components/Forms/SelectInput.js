import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

const Select = styled(Autocomplete)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(2),
    }
}));

/**
 *
 * @param {*} param0
 * @returns
 */
const SelectInput = ({
    control,
    name,
    defaultValue,
    rules,
    options,
    multiple,
    validations,
    placeholder,
    InputProps,
    disabled,
    label,
}) => (
    <FormControl>
        {label && <InputLabel shrink>{label}</InputLabel>}
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field: { ref, onChange, ...field } }) => (
                <>
                    <Select
                        multiple={false}
                        options={options}
                        defaultValue={defaultValue}
                        getOptionLabel={(option) => option.label}
                        onChange={(_, data) => onChange(data)}
                        renderInput={params => (
                            <TextField
                                {...field}
                                {...params}
                                fullWidth
                                inputRef={ref}
                                {...InputProps}
                                disabled={disabled}
                            />
                        )}
                    />
                    {/* {error && (
                        <FormHelperText error>
                            {validations[name][error.type]}
                        </FormHelperText>
                    )} */}
                </>
            )}
        />
    </FormControl>
);

export default SelectInput;
