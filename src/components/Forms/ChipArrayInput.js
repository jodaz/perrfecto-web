import * as React from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Controller } from "react-hook-form";
import { styled, alpha } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Chip = styled(MuiToggleButton)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main} !important`,
    borderRadius: '100px !important',
    color: theme.palette.primary.main,
    textTransform: 'unset',
    fontSize: '1.05rem',
    width: 'fit-content !important',
    fontWeight: 500,
    gap: '8px',
    boxShadown: '0px 2px 12px rgba(161, 103, 201, 0.36);',
    fontSize: '12px',
    marginRight: '16px',
    marginBottom: '16px',
    whiteSpace: 'nowrap',
    transition: '0.3s',
    '&[aria-pressed="true"]': {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            color: '#fff',
            backgroundColor: `${alpha(theme.palette.primary.main, 0.9)}`,
        }
    },
}));

const ChipArrayInput = ({
    control,
    name,
    labels,
    label,
    rules,
    disabled,
    defaultValue,
    property = 'name',
    propertyValue = 'id',
    validations
}) => (
    <FormControl>
        {label && <InputLabel color="divider" shrink>{label}</InputLabel>}
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
                <>
                    <ToggleButtonGroup
                        {...field}
                        value={value}
                        onChange={(_, data) => onChange(data)}
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginTop: '1rem'
                        }}
                    >
                        {labels.map(label => (
                            <Chip
                                value={label[propertyValue]}
                                aria-label={label}
                                color="primary"
                                size="small"
                                disabled={disabled}
                            >
                                {label[property]}
                            </Chip>
                        ))}
                    </ToggleButtonGroup>
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

export default ChipArrayInput
