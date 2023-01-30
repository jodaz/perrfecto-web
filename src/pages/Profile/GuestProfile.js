import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { logout, useAuth } from '../../context/AuthContext';
import LinkBehavior from '../../components/LinkBehavior';
import SettingsLayout from '../../layouts/SettingsLayout'

const GuestProfile = () => {
    const { dispatch } = useAuth();

    return (
        <SettingsLayout title="Configuraciones">
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end'
            }}>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={() => logout(dispatch)}
                        component={LinkBehavior}
                        to='/'
                    >
                        Cerrar sesión
                    </Button>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default GuestProfile
