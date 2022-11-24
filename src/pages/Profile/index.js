import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth, logout } from '../../context/AuthContext'
import LinkBehavior from '../../components/LinkBehavior';

export default function Profile() {
    const { dispatch } = useAuth();

    return (
        <Box sx={{ display: 'flex', p: 3 }}>
            <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => logout(dispatch)}
                component={LinkBehavior}
                to='/'
            >
                Cerrar sesión
            </Button>
        </Box>
    );
}
