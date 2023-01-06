import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth, logout } from '../../context/AuthContext';
import LinkBehavior from '../../components/LinkBehavior';
import { Stack } from '@mui/system';

const InviteGuest = () => {
    const { dispatch } = useAuth()

    return (
        <Box sx={{ width: '100%', mb: 1 }}>
            <Box p={4}>
                Actualmente tienes acceso
                como invitado,
                para acceder a más funciones,
                pulsa el botón y
                registrate.
            </Box>
            <Stack spacing={1} p={4}>
                <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    type="submit"
                    component={LinkBehavior}
                    to='/register'
                    sx={{ color: '#fff' }}
                >
                    Registrarme
                </Button>
                <Button
                    color="primary"
                    fullWidth
                    onClick={() => logout(dispatch)}
                    component={LinkBehavior}
                    to='/'
                >
                    Volver
                </Button>
            </Stack>
        </Box>
    );
}

export default InviteGuest
