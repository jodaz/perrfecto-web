import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import AccountDeleteWarning from '../../components/Modals/AccountDeleteWarning';
import LinkBehavior from '../../components/LinkBehavior';
import getSearchParams from '../../utils/getSearchParams';
import { useNavigate } from 'react-router-dom';
import ListItemLink from '../../components/ListItemLink';
import { useAuth } from '../../context/AuthContext';
import parsePhoneNumber from 'libphonenumber-js'

const formatPhone = user => (
    user.phone ? parsePhoneNumber(`+${user.code_phone}${user.phone}`).formatInternational()
    : 'No tiene'
)

const Account = ({ location }) => {
    const { state: { user } } = useAuth()
    const openDeleteModal = getSearchParams(location, 'delete')
    const navigate = useNavigate();
    const currPhone = formatPhone(user);

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
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'start',
                        marginTop: 1,
                        marginBottom: 1
                    }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="body2"
                                color='text.tertiary'
                                gutterBottom
                            >
                                Email
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                            >
                                {user.email}
                            </Typography>
                            <Typography
                                variant="body2"
                                color='text.tertiary'
                                gutterBottom
                            >
                                Teléfono
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                            >
                                {currPhone}
                            </Typography>
                        </Box>
                        <Button component={LinkBehavior} to='access' sx={{ fontWeight: 400 }}>
                            Editar
                        </Button>
                    </Box>
                    <Divider />
                    <Box mt={1} mb={1}>
                        <ListItemLink to='security' title='Contraseña' />
                    </Box>
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
