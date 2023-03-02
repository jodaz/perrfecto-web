import * as React from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../DialogTitle';
import Link from '@mui/material/Link';
import PasswordInput from '../Forms/PasswordInput'
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextInput from '../Forms/TextInput';
import LinkBehavior from '../LinkBehavior';
import { useNavigate } from 'react-router-dom';
import SocialAuth from '../SocialAuth'
import PhoneInput from '../Forms/PhoneInput'
import { apiProvider } from '../../api'
import { Divider } from '@mui/material';
import { useAuth, loginUser } from '../../context/AuthContext'
import getSearchParams from '../../utils/getSearchParams';
import useMediaQuery from '@mui/material/useMediaQuery';
import VerifyPhone from '../Modals/VerifyPhone';
// Other components
import {
    NAME,
    LAST_NAME,
    PHONE,
    EMAIL,
    CONFIRM_PASSWORD,
    PASSWORD
} from '../../validations'

export default function SignUp({ location }) {
    const [verifyValues, setVerifyValues] = React.useState(null)
    const [openVerifyPhone, setOpenVerifyPhone] = React.useState(false)
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const navigate = useNavigate()
    const { dispatch } = useAuth();
    const { control, handleSubmit, setError, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({ 'code_phone': 34 }))
    });
    const password = watch("password", "");
    const isPhoneRegister = getSearchParams(location, 'withPhone');

    const handleClose = () => navigate(-1)

    const toggleVerifyPhone = () => setOpenVerifyPhone(!openVerifyPhone);

    const authenticateAndRedirect = response => {
        const { data } = response;

        loginUser(dispatch, data)
        navigate('/register/welcome')
    }

    /**
     * Send register data and get code at phone user
     */
    const verifyPhone = async values => {
        try {
            const { email, ...restValues } = values
            const response = await apiProvider.post('/api/user/send-code-register-phone', values)

            if (response.status >= 200 && response.status < 300) {
                setVerifyValues(restValues)
                return toggleVerifyPhone() // Abre modal de verificación
            }
        } catch (error) {
            if (error.response.data.msg) {
                const message = error.response.data.msg;

                if (message.includes(' There was a problem')) {
                    setError('phone', {
                        type: 'unique'
                    })
                }
            }
        }
    };

    /**
     * Sideaction used after user is registered successfully
     * @param {AxiosResponse} response
     * @returns null
     */
    const verifyPhoneModalSideaction = response => () => {
        authenticateAndRedirect(response)
        setVerifyValues(null)
    }

    /**
     * Register user with email only
     * @param {*} data
     */
    const registerUserWithEmail = async data => {
        try {
            const {
                code_phone,
                phone,
                ...restData
            } = data;

            // if (isPhoneRegister) {
            //     restData.code_phone = data.code_phone
            // }

            const res = await apiProvider.post('/api/auth/new', restData)

            if (res.status >= 200 || res.status < 300) {
                authenticateAndRedirect(res);
            }
        } catch (error) {
            if (error.response.data.msg) {
                const message = error.response.data.msg;

                if (message.includes('There is a user with the provided email')) {
                    setError('email', {
                       type: 'unique'
                    })
                }
            }
        }
    };

    const onSubmit = React.useCallback(values => {
        // Valida el numero de telefono solo si no ha sido validado antes
        if (isPhoneRegister) {
            return verifyPhone(values)
        } else {
            return registerUserWithEmail(values)
        }
    }, [isPhoneRegister]);

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/register'}
        >
            <DialogTitle onClose={handleClose} />
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
                                Crear cuenta
                            </Box>
                            <Box>
                            Al crear una cuenta TinderDogs estás aceptando continuar de acuerdo a
                                nuestros <Link href="terms-conditions" underline="none">Términos y condiciones</Link> y con nuestra
                                    <Link href="privacy" underline="none">  Política de Privacidad</Link>
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
                                <SocialAuth hidePhone={isPhoneRegister} location={location} />
                            </Box>
                            <Box>
                                ¿Ya tienes una cuenta?
                                <Link
                                    href="/login"
                                    underline="none"
                                    component={LinkBehavior}
                                    to='/login'
                                    sx={{ marginLeft: '1rem' }}
                                >
                                    Inicia sesión
                                </Link>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" flexItem>o</Divider>
                    </>
                )}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ m: 1, flex: 1 }}>
                    {(isSmall) && (
                        <Box component='h2' margin='0 0 1rem 0' color="text.primary">
                            Crear cuenta
                        </Box>
                    )}
                    <Box sx={{ p: 1 }}>
                        <TextInput
                            label="Nombre"
                            control={control}
                            name="name"
                            placeholder='Ingresar nombre'
                            rules={NAME.rules}
                            validations={NAME.messages}
                            disabled={isSubmitting}
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextInput
                            label="Apellido"
                            control={control}
                            name="lastName"
                            placeholder='Ingresar apellido'
                            rules={LAST_NAME.rules}
                            validations={LAST_NAME.messages}
                            disabled={isSubmitting}
                        />
                    </Box>
                    {(isPhoneRegister) ? (
                        <>
                            <Box sx={{ p: 1 }}>
                                <PhoneInput
                                    label="Teléfono"
                                    control={control}
                                    name="phone"
                                    rules={PHONE.rules}
                                    validations={PHONE.messages}
                                    placeholder='Ingresar teléfono'
                                />
                            </Box>
                        </>
                    ) : (
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
                    )}
                    <Box sx={{ p: 1 }}>
                        <PasswordInput
                            label='Contraseña'
                            control={control}
                            name="password"
                            rules={PASSWORD.rules}
                            validations={PASSWORD.messages}
                            disabled={isSubmitting}
                            placeholder='Ingresar contraseña'
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <PasswordInput
                            label='Confirmar contraseña'
                            control={control}
                            name="confirm"
                            rules={{
                                ...CONFIRM_PASSWORD.rules,
                                validate: value => value === password
                            }}
                            validations={CONFIRM_PASSWORD.messages}
                            disabled={isSubmitting}
                            placeholder='Repita la contraseña'
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
                                Siguiente
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {isSmall &&  (
                <Box marginTop='1rem' sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    paddingBottom: 2
                }}>
                    <Box pl={2} pr={2}>
                        <Divider orientation="horizontal" flexItem>o iniciar sesión con</Divider>
                    </Box>
                    <SocialAuth location={location} />
                    <Box>
                        ¿Aún no tienes una cuenta?
                    </Box>
                    <Link
                        href="/register"
                        underline="none"
                        component={LinkBehavior}
                        to='/register'
                        sx={{ marginLeft: '0.5rem' }}
                    >
                        Crear cuenta
                    </Link>
                </Box>
            )}

            {openVerifyPhone && (
                <VerifyPhone
                    open={openVerifyPhone}
                    data={verifyValues}
                    handleClose={toggleVerifyPhone}
                    updateStatus={verifyPhoneModalSideaction}
                    endpoint='/api/auth/new'
                    method='post'
                />
            )}
        </Dialog>
    );
}
