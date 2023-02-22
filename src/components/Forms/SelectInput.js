import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { ReactComponent as ChevronDownIcon } from '../../assets/icons/ChevronDown.svg'
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'

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
    InputProps,
    disabled,
    label,
    optionLabel = 'label',
    ...rest
}) => (
    <FormControl>
        {label && <InputLabel shrink>{label}</InputLabel>}
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            validations={validations}
            rules={rules}
            render={({ field: { ref, onChange, value, ...fieldRest }, fieldState: { error } }) => (
                <>
                    <Select
                        value={value || null}
                        multiple={multiple}
                        options={options}
                        defaultValue={value}
                        getOptionLabel={(option) => option[optionLabel]}
                        onChange={(_, data) => onChange(data)}
                        renderInput={params => (
                            <TextField
                                {...fieldRest}
                                {...params}
                                fullWidth
                                error={error != undefined}
                                inputRef={ref}
                                InputProps={{ ...params.InputProps, ...InputProps }}
                                disabled={disabled}
                            />
                        )}
                        clearIcon={<CloseIcon />}
                        popupIcon={<ChevronDownIcon />}
                        disableClearable
                        {...rest}
                    />
                    {!!(error && validations) && (
                        <FormHelperText error>
                            {validations[error.type]}
                        </FormHelperText>
                    )}
                </>
            )}
        />
    </FormControl>
);

export default SelectInput;
