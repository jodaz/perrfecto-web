import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { logout, useAuth } from '../../context/AuthContext';
import SettingsLayout from '../../layouts/SettingsLayout';

const Account = () => {
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
    const { dispatch } = useAuth();

    const handleDeleteAccount = () => {
        setOpenDeleteModal(!openDeleteModal)
    }

    return (
        <SettingsLayout title="Cuenta de acceso">
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box sx={{ p: 2 }}>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={handleDeleteAccount}
                    >
                        Eliminar cuenta
                    </Button>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default Account
