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
                <Box mt={2}>
                    <DatePicker
                        value={value}
                        disabled={disabled}
                        onChange={value => onChange(value)}
                        components={{
                            OpenPickerIcon: Calendar
                        }}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <InputBase
                                ref={inputRef}
                                {...inputProps}
                                {...InputProps}
                            />
                        )}
                        {...restField}
                    />
                    {error && (
                        <FormHelperText error>
                            {validations[name][error.type]}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    </FormControl>
)

export default DateInput
