import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Controller } from 'react-hook-form'
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
    disabled
}) => (
    <Controller
        control={control}
        name='phone'
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
            <Input
                {...field}
                placeholder='Ingrese su teléfono'
                type={type}
                error={error != undefined}
                disabled={disabled}
                startAdornment={
                    <InputAdornment position="start">
                        <CodePopover control={control} />
                    </InputAdornment>
                }
            />
        )}
    />
);

export default PhoneInput
