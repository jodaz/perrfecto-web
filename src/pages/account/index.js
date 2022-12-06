import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { logout, useAuth } from '../../context/AuthContext';
import SettingsLayout from '../../layouts/SettingsLayout';
import DeleteAccount from '../../components/Modals/DeleteAccount';
import LinkBehavior from '../../components/LinkBehavior';
import getSearchParams from '../../utils/getSearchParams';
import { useNavigate } from 'react-router-dom';

const Account = ({ location }) => {
    const openDeleteModal = getSearchParams(location, 'delete')
    const navigate = useNavigate();
    const { dispatch } = useAuth();

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
                        component={LinkBehavior}
                        to='?delete=true'
                    >
                        Eliminar cuenta
                    </Button>
                </Box>
            </Box>
            <DeleteAccount open={openDeleteModal} handleClose={() => navigate(-1)} />
        </SettingsLayout>
    );
}

export default Account
