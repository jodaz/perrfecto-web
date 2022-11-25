import * as React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputBase from '@mui/material/InputBase';
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { Controller } from 'react-hook-form'

const DateInput = ({
    control,
    name,
    defaultValue = new Date(),
    rules,
    validations,
    disabled,
    label
}) => (
    <FormControl>
        {label && <InputLabel shrink>{label}</InputLabel>}
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field: { onChange, ...restField }, fieldState: { error, value } }) => (
                <>
                    <DatePicker
                        value={value}
                        disabled={disabled}
                        onChange={value => onChange(value)}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: 'fit-content',
                                height: 'fit-content'
                            }}>
                                <Box
                                    ref={inputRef}
                                    sx={{
                                        backgroundColor: theme => theme.palette.primary.main,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '2.5rem',
                                        height: '2.5rem'
                                    }}
                                >
                                    {InputProps?.endAdornment}
                                </Box>
                                <InputBase {...inputProps} />
                            </Box>
                        )}
                        {...restField}
                    />
                    {error && (
                        <FormHelperText error>
                            {validations[name][error.type]}
                        </FormHelperText>
                    )}
                </>
            )}
        />
    </FormControl>
)

export default DateInput
