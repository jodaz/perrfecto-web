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
import Checkbox from '../Forms/Checkbox';
import vars from '../../vars'
import { apiProvider } from '../../api'
import getSearchParams from '../../utils/getSearchParams';
import PhoneInput from '../Forms/PhoneInput';
import { useAuth, loginUser } from '../../context/AuthContext'

const validations = {
    code_phone: {
        required: "Seleccione su pais"
    },
    phone: {
        required: "Ingrese su teléfono",
        pattern: 'Introduzca un número de teléfono válido'
    },
    email: {
        required: "Ingrese su correo",
        pattern: "Email inválido"
    },
    password: {
        required: "Ingrese una contraseña",
        minLength: "Mínimo 6 caracteres"
    }
}

const rules = {
    email: {
        required: true,
        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    phone: {
        required: true,
        pattern: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    },
    password: {
        required: true,
        minLength: 6
    }
}

export default function Login({ location }) {
    const navigate = useNavigate()
    const isPhoneRegister = getSearchParams(location, 'withPhone');
    const [error, setError] = React.useState(false)
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const { dispatch } = useAuth();

    const onSubmit = async (data) => {
        setError(false);

        const res = await apiProvider.post('/api/auth', {
            ...data
        }).catch(error => {
            if (error.response.status == 400) {
                setError(true)
            }
        });

        if (res.status >= 200 && res.status < 300) {
            const { data } = res;
            loginUser(dispatch, data)

            navigate('/detect-location')
        }
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
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/login'}
        >
            <DialogTitle id="customized-dialog-title" onClose={handleClose} />
            <Box sx={{
                m: 1,
                display: 'flex',
                width: '800px',
                height: 'fit-content',
                p: 3,
                color: theme => theme.palette.text.secondary
            }}>
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
                        nuestros <Link href="#" underline="none">Términos y condiciones</Link> y con nuestra
                            <Link href="#" underline="none">  Política de Privacidad</Link>
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
                        <SocialLogin />
                    </Box>
                    <Box>
                        ¿Aún no tienes una cuenta? <Link href="#" underline="none" component={LinkBehavior} to='/register'>Crear cuenta</Link>
                    </Box>
                </Box>
                <Divider orientation="vertical" flexItem>o</Divider>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ m: 1, flex: 1 }}>
                    {(error) && (
                        <Alert severity="error" sx={{ marginBottom: '1.5rem' }}>
                            No estás registrado. Crea una cuenta para poder comenzar en TinderDogs.
                        </Alert>
                    )}
                    {(!isPhoneRegister) ? (
                        <Box sx={{ p: 1 }}>
                            <TextInput
                                label="Email"
                                control={control}
                                name="email"
                                type="email"
                                rules={rules.email}
                                validations={validations}
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
                                rules={rules.phone}
                                validations={validations}
                            />
                        </Box>
                    )}

                    <Box sx={{ p: 1 }}>
                        <PasswordInput
                            label='Contraseña'
                            control={control}
                            name="password"
                            disabled={isSubmitting}
                            rules={rules.password}
                            validations={validations}
                            placeholder='Ingresar contraseña'
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Checkbox
                            control={control}
                            name='remember_me'
                            label='Recordar contraseña'
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
        </Dialog>
    );
}
