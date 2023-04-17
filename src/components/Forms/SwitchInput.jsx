import React from 'react';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel'
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: '#E9E9EA',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }
));

const SwitchInput = ({
    control,
    name,
    defaultValue,
    label,
    ...rest
}) => {

    const generateSwitchInput = () => (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field: { value, onChange, ...field } }) => (
                <FormControlLabel
                    control={
                        <IOSSwitch
                            onChange={onChange}
                            checked={value}
                            {...field}
                            {...rest}
                        />
                    }
                />
            )}
        />
    )

    if (label) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 1
            }}>
                <Typography variant="subtitle1" color="text.secondary">
                    {label}
                </Typography>
                <Controller
                    control={control}
                    name={name}
                    defaultValue={defaultValue}
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormControlLabel
                            control={
                                <IOSSwitch
                                    onChange={onChange}
                                    checked={value}
                                    {...field}
                                    {...rest}
                                />
                            }
                        />
                    )}
                />
            </Box>
        )
    }

    return generateSwitchInput();
};

SwitchInput.defaultProps = {
    defaultValue: false
}

export default SwitchInput;
