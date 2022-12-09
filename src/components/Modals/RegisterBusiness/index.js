import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../../DialogTitle';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import RegisterBusinessForm from './RegisterBusinessForm';
import { Typography, Link as MuiLink, styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const Link = styled(MuiLink)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    '&:hover': {
        textDecoration: 'underline'
    }
}));

const EllipseComponent = ({
    n,
    sx
}) => (
    <Box
        component='img'
        src={`/images/default/Ellipse${n}.png`}
        sx={{
            position: 'absolute',
            ...sx
        }}
    />
)

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
                        <EllipseComponent sx={{ bottom: 0, right: 0 }} n={9} />
                        <EllipseComponent sx={{ right: '50px', top: '550px' }} n={8} />
                        <EllipseComponent sx={{ right: '50px', top: '550px' }} n={8} />
                        <EllipseComponent sx={{ right: '50px', top: '350px' }} n={7} />
                        <EllipseComponent sx={{ right: 0, top: '50px' }} n={6} />
                        <EllipseComponent sx={{ top: '200px', left: '150px' }} n={5} />
                        <EllipseComponent sx={{ top: '450px', left: '50px' }} n={4} />
                        <EllipseComponent sx={{ top: '200px' }} n={1} />
                        <EllipseComponent sx={{ bottom: '0' }} n={2} />
                        <EllipseComponent sx={{ top: '0' }} n={3} />
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
