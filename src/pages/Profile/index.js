import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth, logout } from '../../context/AuthContext'
import LinkBehavior from '../../components/LinkBehavior';
import RegisterOwner from '../../components/RegisterOwner';

export default function Profile() {
    const { dispatch } = useAuth();
    const [openProfileRegister, setOpenProfileRegister] = React.useState(false)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
            <Box sx={{ p: 1 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setOpenProfileRegister(true)}
                >
                    Completar perfil (propietario)
                </Button>
            </Box>
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
            <RegisterOwner open={openProfileRegister} handleClose={() => setOpenProfileRegister(false)} />
        </Box>
    );
}
