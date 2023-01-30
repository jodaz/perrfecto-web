import * as React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputBase from '@mui/material/InputBase';
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { Controller } from 'react-hook-form'
import { Calendar } from 'lucide-react'

const DateInput = ({
    control,
    name,
    defaultValue = '',
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
                <Box mt={2}>
                    <DatePicker
                        disableFuture
                        value={value}
                        label='Seleccione una fecha'
                        disabled={disabled}
                        onChange={value => onChange(value)}
                        placeholder="Seleccione una fecha"
                        components={{
                            OpenPickerIcon: () => <Calendar />
                        }}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <InputBase
                                error={error}
                                fullWidth
                                ref={inputRef}
                                {...inputProps}
                                {...InputProps}
                                placeholder="Seleccione una fecha"
                            />
                        )}
                        {...restField}
                        InputAdornmentProps={{
                            position: 'start'
                        }}
                    />
                    {error && (
                        <FormHelperText error>
                            {validations[error.type]}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    </FormControl>
)

export default DateInput
