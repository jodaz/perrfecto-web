import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../../DialogTitle';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import RegisterBusinessForm from './RegisterBusinessForm';
import { Typography, Link as MuiLink, styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import EllipseImage from '../../EllipseImage';

const Link = styled(MuiLink)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    '&:hover': {
        textDecoration: 'underline'
    }
}));

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
                height: 'fit-content'
            }}>
                {!isSmall && (
                    <Box sx={{
                        flex: 1,
                        backgroundColor: '#A167C9',
                        color: '#fff',
                        fontWeight: 400,
                        position: 'relative'
                    }}>
                        <EllipseImage sx={{ bottom: 0, right: 0 }} n={'Ellipse9'} />
                        <EllipseImage sx={{ right: '50px', top: '550px' }} n={'Ellipse8'} />
                        <EllipseImage sx={{ right: '50px', top: '550px' }} n={'Ellipse8'} />
                        <EllipseImage sx={{ right: '50px', top: '350px' }} n={'Ellipse7'} />
                        <EllipseImage sx={{ right: 0, top: '50px' }} n={'Ellipse6'} />
                        <EllipseImage sx={{ top: '200px', left: '150px' }} n={'Ellipse5'} />
                        <EllipseImage sx={{ top: '450px', left: '50px' }} n={'Ellipse4'} />
                        <EllipseImage sx={{ top: '200px' }} n={'Ellipse1'} />
                        <EllipseImage sx={{ bottom: '0' }} n={'Ellipse2'} />
                        <EllipseImage sx={{ top: '0' }} n={'Ellipse3'} />
                        <Box sx={{
                            margin: 5,
                            zIndex: 1000,
                            position: 'absolute',
                            top: 0
                        }}>
                            <Typography variant="h4" color="secondary.main" sx={{ pb: 4, fontWeight: 500 }}>
                                Registra tu negocio
                            </Typography>
                            <Box>
                            Al crear una cuenta TinderDogs estás aceptando continuar de acuerdo a
                                nuestros <Link href="/terms-conditions" underline="none">Términos y condiciones</Link> y con nuestra
                                    <Link href="/privacy" underline="none">  Política de Privacidad</Link>
                            </Box>
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
