import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    CONFIRM_PASSWORD,
    PASSWORD
} from '../../validations'
import PasswordInput from '../../components/Forms/PasswordInput';
import { apiProvider } from '../../api';

const UpdatePassword = () => {
    const { control, watch, handleSubmit, setError, formState: {
        isSubmitting
    }} = useForm({ reValidateMode: "onBlur" });
    const navigate = useNavigate();
    const newPassword = watch("password", "");

    const onSubmit = async values => {
        try {
            const res = await apiProvider.post(`/api/auth/update-password`, values)

            if (res.status >= 200 && res.status < 300) {
                navigate(-1)
            }
        } catch (error) {
            const message = error.response.data.msg;

            if (message.includes('Wrong Password')) {
                setError('old_password', {
                    type: 'wrong'
                })
            }
        }
    }

    return (
        <SettingsLayout title='Actualizar contraseña'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}  component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box sx={{ p: 2, display: 'flex' }}>
                        <PasswordInput
                            control={control}
                            name='old_password'
                            label="Contraseña anterior"
                            rules={PASSWORD.rules}
                            validations={PASSWORD.messages}
                            placeholder='Ingrese su contraseña anterior'
                            disabled={isSubmitting}
                        />
                    </Box>
                    <Box sx={{ p: 2, display: 'flex' }}>
                        <PasswordInput
                            control={control}
                            name='password'
                            label="Contraseña nueva"
                            placeholder='Ingrese su nueva contraseña'
                            rules={PASSWORD.rules}
                            validations={PASSWORD.messages}
                            disabled={isSubmitting}
                        />
                    </Box>
                    <Box sx={{ p: 2, display: 'flex' }}>
                        <PasswordInput
                            control={control}
                            name='confirm'
                            label="Confirmar contraseña"
                            rules={{
                                ...CONFIRM_PASSWORD.rules,
                                validate: value => value === newPassword
                            }}
                            validations={CONFIRM_PASSWORD.messages}
                            placeholder='Repita su nueva contraseña'
                            disabled={isSubmitting}
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
            </Box>
        </SettingsLayout>
    );
}

export default UpdatePassword
