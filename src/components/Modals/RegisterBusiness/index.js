import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../../DialogTitle';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import RegisterBusinessForm from './RegisterBusinessForm';
import { Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const RegisterBusiness = ({ location }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()
    const handleClose = () => navigate('/business')

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/business/register'}
        >
            <Box sx={{
                display: 'flex',
                width: isSmall ? 'fit-content' : '800px',
                height: 'fit-content',
                color: theme => theme.palette.text.secondary
            }}>
                {!isSmall && (
                    <Box sx={{
                        flex: 1,
                        backgroundColor: '#A167C9'
                    }}>
                        <Box sx={{
                            margin: 5
                        }}>
                            <Typography variant="h4" color="secondary.main" sx={{ pb: 4, fontWeight: 500 }}>
                                Registra tu negocio
                            </Typography>
                            <Typography variant="body2" color="secondary.main">
                            Al iniciar sesión en TinderDogs estás aceptando
                                continuar de acuerdo a nuestros
                                <strong> Términos y condiciones </strong> y con nuestra
                                <strong> Política de Privacidad </strong>
                            </Typography>
                        </Box>
                    </Box>
                )}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <DialogTitle onClose={handleClose} />
                    <RegisterBusinessForm isSmall={isSmall} />
                </Box>
            </Box>
        </Dialog>
    );
}

export default RegisterBusiness
