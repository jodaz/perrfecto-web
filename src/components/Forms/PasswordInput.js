import * as React from 'react';
import { useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import Eye from '../../assets/icons/Eye';
import EyeOff from '../../assets/icons/EyeOff';
import TextInput from './TextInput';

const PasswordInput = ({
    initiallyVisible = false,
    visibilityIcon,
    visibilityOffIcon,
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
                    <InputAdornment position="end">
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
            {...rest}
        />
    );
};

PasswordInput.defaultProps = {
    visibilityIcon: <Eye />,
    visibilityOffIcon: <EyeOff />
}

export default PasswordInput
