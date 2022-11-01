import React from 'react';
import MUICheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { Controller } from "react-hook-form";

const Checkbox = ({
    control,
    name,
    defaultValue,
    rules,
    type,
    InputProps,
    label
}) => (
    <FormControl>
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field: { value, onChange, ...field } }) => (
                <FormControlLabel
                    control={
                        <MUICheckbox onChange={onChange} checked={value} {...field} />
                    }
                    label={label}
                />
            )}
        />
    </FormControl>
);

Checkbox.defaultProps = {
    defaultValue: false
}

export default Checkbox;
