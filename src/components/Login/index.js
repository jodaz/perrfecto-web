import * as React from 'react';
import Button from '../Button';
import { alpha } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../DialogTitle';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import PasswordInput from '../Forms/PasswordInput'
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextInput from '../Forms/TextInput'
import LinkBehavior from '../LinkBehavior';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin'
import Alert from '@mui/material/Alert';
import { apiProvider } from '../../api'
import getSearchParams from '../../utils/getSearchParams';
import PhoneInput from '../Forms/PhoneInput';
import { useAuth, loginUser, guestUser } from '../../context/AuthContext'
import { PHONE, EMAIL, PASSWORD } from '../../validations'
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Login({ location }) {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()
    const isPhoneRegister = getSearchParams(location, 'withPhone');
    const [errorAlert, setErrorAlert] = React.useState('')
    const { control, handleSubmit, setError, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const { dispatch } = useAuth();

    const onSubmit = async (data) => {
        console.log(data)
        setErrorAlert('');
        try {
            const res = await apiProvider.post('/api/auth', {
                ...data
            })

            if (res.status >= 200 && res.status < 300) {
                const { data } = res;
                loginUser(dispatch, data)

                if (data.data.role == 'user') {
                    navigate('/detect-location')
                } else {
                    navigate('/home')
                }
            }
        } catch (error) {
            if (error.response.data.msg) {
                const message = error.response.data.msg;

                if (message.includes('The user does not exist with that email')) {
                    setErrorAlert('No estás registrado. Crea una cuenta para poder comenzar en TinderDogs.')
                }
                if (message.includes('The user does not exist with that phone')) {
                    setErrorAlert('No estás registrado. Crea una cuenta para poder comenzar en TinderDogs.')
                }
                if (message.includes('Wrong Password')) {
                    setError('password', {
                        type: 'invalid'
                    })
                }
            }
        }
    };

    const handleClose = () => navigate('/')

    const handleGuestButton = () => {
        guestUser(dispatch)
        navigate('/home')
    }

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/login'}
        >
            <DialogTitle
                onClose={handleClose}
            />
            <Box sx={{
                m: 1,
                display: 'flex',
                width: isSmall ? 'fit-content' : '800px',
                height: 'fit-content',
                p: isSmall ? 1 : 3,
                color: theme => theme.palette.text.secondary
            }}>
                {!isSmall && (
                    <>
                        <Box sx={{
                            flex: 1,
                            m: 1,
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Box component='h1' margin='0 0 1rem 0' color="text.primary">
                                Iniciar sesión
                            </Box>
                            <Box>
                                Al iniciar sesión en TinderDogs estás aceptando continuar de acuerdo a
                                nuestros <Link href="/terms-conditions" underline="none">Términos y condiciones</Link> y con nuestra
                                    <Link href="/privacy" underline="none">  Política de Privacidad</Link>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                margin: '3rem auto'
                            }}>
                                <Box>
                                    Continuar con
                                </Box>
                                <SocialLogin hidePhone={isPhoneRegister} location={location} />
                            </Box>
                            <Box>
                                ¿Aún no tienes una cuenta? <Link href="#" underline="none" component={LinkBehavior} to='/register'>Crear cuenta</Link>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" flexItem>o</Divider>
                    </>
                )}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ m: 1, flex: 1 }}>
                    {(isSmall) && (
                        <Box component='h2' margin='0 0 1rem 0' color="text.primary">
                            Iniciar sesión
                        </Box>
                    )}
                    {(errorAlert) && (
                        <Alert severity="error" sx={{ marginBottom: '1.5rem' }}>
                            {errorAlert}
                        </Alert>
                    )}
                    {(!isPhoneRegister) ? (
                        <Box sx={{ p: 1 }}>
                            <TextInput
                                label="Email"
                                control={control}
                                name="email"
                                type="email"
                                rules={EMAIL.rules}
                                validations={EMAIL.messages}
                                disabled={isSubmitting}
                                placeholder='Ingresar correo electrónico'
                            />
                        </Box>
                    ) : (
                        <Box sx={{ p: 1 }}>
                            <PhoneInput
                                label="Teléfono"
                                control={control}
                                name="phone"
                                placeholder='Ingresar teléfono'
                                rules={PHONE.rules}
                                validations={PHONE.messages}
                            />
                        </Box>
                    )}

                    <Box sx={{ p: 1 }}>
                        <PasswordInput
                            label='Contraseña'
                            control={control}
                            name="password"
                            disabled={isSubmitting}
                            rules={PASSWORD.rules}
                            validations={PASSWORD.messages}
                            placeholder='Ingresar contraseña'
                        />
                    </Box>
                    <Box textAlign='center'>
                        <Box sx={{ p: 1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                disabled={isSubmitting}
                            >
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
                        <Box sx={{ p: 1 }}>
                            <Link
                                component={LinkBehavior}
                                to="/recover-password"
                                color="text.primary"
                            >
                                Olvidé mi contraseña
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {isSmall &&  (
                <Box marginTop='1rem' sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box pl={2} pr={2}>
                        <Divider orientation="horizontal" flexItem>o iniciar sesión con</Divider>
                    </Box>
                    <SocialLogin location={location} />
                    <Box sx={{ margin: '0 auto 2rem auto' }}>
                        ¿Ya tienes una cuenta?
                        <Link
                            href="/register"
                            underline="none"
                            component={LinkBehavior}
                            to='/register'
                            sx={{ marginLeft: '0.5rem' }}
                        >
                            Inicia sesión
                        </Link>
                    </Box>
                </Box>
            )}
        </Dialog>
    );
}
