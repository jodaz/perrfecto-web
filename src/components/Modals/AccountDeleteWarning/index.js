import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { XSquare } from 'lucide-react';
import Stack from '@mui/material/Stack';
import { logout, useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiProvider } from '../../../api'
import { alpha } from '@mui/material';

const AccountDeleteWarning = ({ open, handleClose }) => {
    const [errorAlert, setErrorAlert] = React.useState('')
    const navigate = useNavigate();
    const { dispatch } = useAuth();

    const submitDelete = async () => {
        try {
            const res = await apiProvider.delete('/api/user')

            if (res.status >= 200 && res.status < 300) {
                logout(dispatch);
                navigate('/?delete=true')
            }
        } catch (error) {
            if (error.response.data.msg) {
                const message = error.response.data.msg;

                if (message.includes('There is no token in the request')) {
                    setErrorAlert('No estás registrado. Crea una cuenta para poder comenzar en TinderDogs.')
                }
            }
        }
    };

    return (
        <InstagramModal handleClose={handleClose} open={open}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                p: 2,
                maxWidth: '280px',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 4,
                marginRight: '1rem',
                textAlign: 'center',
                color: theme => theme.palette.text.secondary,
            }}>
                <Box sx={{ p: 1, textAlign: 'center' }}>
                    <XSquare size={48} />
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography variant="h6" gutterBottom fontWeight={500}>
                        ¿Estás seguro que deseas eliminar tu cuenta ?
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Al eliminar tu cuenta se borrarán todos tus datos,
                        fotos, lista de favoritos, mensajes y demás...
                        de manera permanente y ya no podrá ser recuperado
                    </Typography>
                    <Stack direction="column">
                        <Button color="error" onClick={submitDelete}>
                            Eliminar cuenta
                        </Button>
                        <Button onClick={handleClose} sx={{
                            color: '#858585',
                            '&:hover': {
                                backgroundColor: `${alpha('#858585', 0.1)}`
                            }
                        }}>
                            Volver
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </InstagramModal>
    );
}

export default AccountDeleteWarning
