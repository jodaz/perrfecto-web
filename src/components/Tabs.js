import * as React from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: '0 !important',
    borderRadius: '100px',
    textTransform: 'unset',
    fontWeight: 500,
    lineHeight: '24px',
    fontSize: '1rem',
    borderBottomLeftRadius: '100px !important',
    borderTopLeftRadius: '100px !important',
    borderBottomRightRadius: '100px !important',
    borderTopRightRadius: '100px !important',
    transition: '0.15s',
    '&[aria-pressed="true"]': {
        boxShadow: '0px 2px 12px rgba(161, 103, 201, 0.36)',
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: `${alpha(theme.palette.primary.main, 0.9)}`,
        }
    },
}));

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '100px',
    justifyContent: 'center',
    width: 'fit-content',
}));

export default function ToggleButtons() {
    const [alignment, setAlignment] = React.useState('profile')
    const navigate = useNavigate();

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment)
        navigate(`?q=${newAlignment}`);
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
        >
            <ToggleButton value="pet" onClick={handleAlignment}>
                Perfil mascota
            </ToggleButton>
            <ToggleButton value="owner" onClick={handleAlignment}>
                Perfil persona
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
