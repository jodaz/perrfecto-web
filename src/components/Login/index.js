import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '../../assets/icons/Close';
import PasswordInput from '../PasswordInput'
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextInput from '../TextInput';
import LinkBehavior from '../LinkBehavior';
import { useNavigate } from 'react-router-dom';
import vars from '../../vars'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialog-paper': {
        borderRadius: '16px',
        maxWidth: 'fit-content'
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 1, p: 3, border: 'none !important' }} {...other}>
        {children}
        {onClose ? (
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon sx={{ stroke: "#5E5E5E" }} />
            </IconButton>
        ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Login({ location }) {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    const handleOnSubmit = (evt) => {
        console.log(evt);
    };

    const handleClose = () => navigate('/')

    const handleGuestButton = () => {
        if (!localStorage.getItem(vars.intro)) {
            return navigate('/introduction')
        } else {
            return navigate('/home')
        }
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={location.pathname == '/login'}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} />
            <Box sx={{
                m: 1,
                display: 'flex',
                width: '800px',
                height: '400px',
                p: 3
            }}>
                <Box sx={{
                    flex: 1,
                    m: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box component='h1' margin='0 0 1rem 0'>
                        Iniciar sesión
                    </Box>
                    <Box>
                    Al iniciar sesión en TinderDogs estás aceptando continuar de acuerdo a
                        nuestros <Link href="#" underline="none">Términos y condiciones</Link> y con nuestra
                            <Link href="#" underline="none">  Política de Privacidad</Link>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '5rem auto'
                    }}>
                        <Box>
                            Continuar con
                        </Box>
                        <Box sx={{ display: 'flex' }}>

                        </Box>
                    </Box>
                    <Box>
                        ¿Aún no tienes una cuenta? <Link href="#" underline="none" component={LinkBehavior} to='/register'>Crear cuenta</Link>
                    </Box>
                </Box>
                <Box component="form" onSubmit={handleOnSubmit} sx={{ m: 1, flex: 1 }}>
                    <Box sx={{ p: 1 }}>
                        <TextInput
                            label="Email"
                            control={control}
                            name="email"
                            type="email"
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <PasswordInput
                            label='Contraseña'
                            control={control}
                            name="password"
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Button variant="contained" color="primary" fullWidth>
                            Iniciar sesión
                        </Button>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Button variant="contained" fullWidth sx={{
                            backgroundColor: '#ccc',
                            '&:hover': {
                                color: '#fff',
                                backgroundColor: alpha(`#000`, 0.3)
                            }
                        }} onClick={handleGuestButton}>
                            Ingresar como invitado
                        </Button>
                    </Box>
                </Box>
            </Box>
        </BootstrapDialog>
    );
}
