import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '../../components/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import TextInput from '../../components/Forms/TextInput';
import formDataHandler from '../../utils/formDataHandler';
import { apiProvider } from '../../api';
import { EMAIL } from '../../validations'
import VerifyPhone from '../../components/Modals/VerifyPhone';

const EditEmail = () => {
    const { state: { user }, dispatch } = useAuth();
    const [email, setEmail] = React.useState(null)
    const [openVerifyEmail, setOpenVerifyEmail] = React.useState(false)
    const [isVerified, setIsVerified] = React.useState(false);
    const navigate = useNavigate()
    const { control, handleSubmit, setError, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({
            email: user.email,
        }))
    });

    const toggleVerifyEmail = () => setOpenVerifyEmail(!openVerifyEmail);

    const verifyEmail = React.useCallback(async values => {
        try {
            const response = await apiProvider.put(`/api/user/email`, values)

            if (response.status >= 200 && response.status < 300) {
                setEmail(values)
                return toggleVerifyEmail() // Abre modal de verificación
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
    }, []);

    const onSubmit = React.useCallback(values => {
        // Valida el numero de telefono solo si no ha sido validado antes
        return verifyEmail(values)
    }, [isVerified]);

    return (
        <SettingsLayout title='Cuenta de acceso'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}  component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box sx={{ p: 2 }}>
                        <TextInput
                            label="Email"
                            control={control}
                            name="email"
                            type="email"
                            rules={EMAIL.rules}
                            validations={EMAIL.messages}
                            disabled={isSubmitting}
                            defaultValue={user.email}
                            placeholder='Ingresar correo electrónico'
                        />
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        Guardar cambios
                    </Button>
                </Box>
                {(openVerifyEmail) && (
                    <VerifyPhone
                        title='Verificar email'
                        open={openVerifyEmail}
                        data={email}
                        handleClose={toggleVerifyEmail}
                        endpoint='/api/user/confirm-change-email'
                        updateStatus={() => {
                            setIsVerified(true)
                            renewToken(dispatch, user)
                            setEmail(null)
                            navigate(-1)
                        }}
                    />
                )}
            </Box>
        </SettingsLayout>
    );
}

export default EditEmail
