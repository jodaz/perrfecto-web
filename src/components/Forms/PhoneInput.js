import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import CodePopover from './CodePopover';
import InputAdornment from '@mui/material/InputAdornment';

const Input = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(2),
    }
}));

const PhoneInput = ({
    control,
    rules,
    defaultValue,
    type,
    disabled,
    validations
}) => {
    const handleChange = (e, func) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value == "" || regex.test(e.target.value)) {
            return func(e.target.value)
        }
    }

    return (
        <FormControl>
            <InputLabel shrink>Teléfono</InputLabel>
            <Controller
                control={control}
                name='phone'
                defaultValue={defaultValue}
                rules={rules}
                render={({ field: { onChange, ...restField }, fieldState: { error } }) => (
                    <>
                        <Input
                            {...restField}
                            onChange={e => handleChange(e, onChange)}
                            placeholder='Ingrese su teléfono'
                            type={type}
                            error={error != undefined}
                            disabled={disabled}
                            startAdornment={
                                <InputAdornment position="start">
                                    <CodePopover control={control} />
                                </InputAdornment>
                            }
                            inputProps={{ maxLength: 11 }}
                        />
                        {error && (
                            <FormHelperText error>
                                {validations[error.type]}
                            </FormHelperText>
                        )}
                    </>
                )}
            />
        </FormControl>
    );
}

export default PhoneInput
