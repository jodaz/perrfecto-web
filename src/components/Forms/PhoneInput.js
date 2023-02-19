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
    name,
    disabled,
    validations,
    defaultCodePhone
}) => {
    const allowOnlyNumber=(value)=>{
        return value.replace(/[^0-9]/g, '')
    }

    return (
        <FormControl>
            <InputLabel shrink>Teléfono</InputLabel>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field: { onChange, ...restField }, fieldState: { error } }) => (
                    <>
                        <Input
                            {...restField}
                            onChange={e => onChange(allowOnlyNumber(e.target.value))}
                            placeholder='Ingrese su teléfono'
                            type={type}
                            error={error != undefined}
                            disabled={disabled}
                            startAdornment={
                                <InputAdornment position="start">
                                    <CodePopover defaultCodePhone={defaultCodePhone} control={control} />
                                </InputAdornment>
                            }
                            inputProps={{ maxLength: 15 }}
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
