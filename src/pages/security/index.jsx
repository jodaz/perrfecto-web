import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import AccountDeleteWarning from '../../components/Modals/AccountDeleteWarning';
import LinkBehavior from '../../components/LinkBehavior';
import getSearchParams from '../../utils/getSearchParams';
import { useNavigate } from 'react-router-dom';
import ListItemLink from '../../components/ListItemLink';

const Security = ({ location }) => {
    const openDeleteModal = getSearchParams(location, 'delete')
    const navigate = useNavigate();

    return (
        <SettingsLayout title="Seguridad">
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box sx={{ p: 2 }}>
                    <ListItemLink to='update-password' title='Contraseña' />
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
            <AccountDeleteWarning open={openDeleteModal} handleClose={() => navigate(-1)} />
        </SettingsLayout>
    );
}

export default Security
