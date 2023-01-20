import * as React from 'react';
import { useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import TextInput from './TextInput';

const PasswordInput = ({
    initiallyVisible = false,
    visibilityIcon,
    visibilityOffIcon,
    disabled,
    ...rest
}) => {
    const [visible, setVisible] = useState(initiallyVisible);

    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        <TextInput
            type={visible ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" disablePointerEvents={disabled}>
                        <IconButton
                            aria-label={
                                visible
                                    ? 'Mostrar'
                                    : 'Ocultar'
                            }
                            onClick={handleClick}
                        >
                            {visible ? visibilityIcon : visibilityOffIcon}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            disabled={disabled}
            {...rest}
        />
    );
};

PasswordInput.defaultProps = {
    visibilityIcon: <Eye />,
    visibilityOffIcon: <EyeOff />
}

export default PasswordInput
