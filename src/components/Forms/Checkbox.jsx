import React from 'react';
import MUICheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel'
import { Controller } from "react-hook-form";

const Checkbox = ({
    control,
    name,
    defaultValue,
    label,
    ...rest
}) => (
    <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, ...field } }) => (
            <FormControlLabel
                control={
                    <MUICheckbox
                        onChange={onChange}
                        checked={value}
                        {...field}
                        {...rest}
                    />
                }
                label={label}
            />
        )}
    />
);

Checkbox.defaultProps = {
    defaultValue: false
}

export default Checkbox;
