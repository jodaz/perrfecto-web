import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import AccountDeleteWarning from '../../components/Modals/AccountDeleteWarning';
import LinkBehavior from '../../components/LinkBehavior';
import getSearchParams from '../../utils/getSearchParams';
import { useNavigate } from 'react-router-dom';
import ListItemLink from '../../components/ListItemLink';

const Account = ({ location }) => {
    const openDeleteModal = getSearchParams(location, 'delete')
    const navigate = useNavigate();

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
                    <Divider />
                    <ListItemLink to='security' title='Contraseña' />
                    <Divider />
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

export default Account
