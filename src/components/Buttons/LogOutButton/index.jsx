import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { logout, useAuth } from '../../../context/AuthContext';
import { LogOut } from 'lucide-react';
import { alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ dark }) => {
    const navigate = useNavigate()
    const { dispatch } = useAuth()

    const handleClick = () => {
        navigate('/')
        logout(dispatch)
    }

    return (
        <Box sx={{
            position: 'absolute',
            top: '60px',
            right: '30px',
            zIndex: 100
        }}>
            <Button color="primary" sx={{
                backgroundColor: '#ECECEC',
                '&:hover': {
                    backgroundColor: `${alpha('#ECECEC', 0.9)}`
                }
            }} onClick={handleClick}>
                <LogOut /> Salir
            </Button>
        </Box>
    );
}

export default LogoutButton;
