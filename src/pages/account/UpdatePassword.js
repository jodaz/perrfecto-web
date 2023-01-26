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
import { useAuth } from '../../context/AuthContext';
import PasswordInput from '../../components/Forms/PasswordInput';

const UpdatePassword = () => {
    const { control, watch, handleSubmit, formState: {
        isSubmitting
    }} = useForm({ reValidateMode: "onBlur" });
    const { state: { user }, dispatch } = useAuth();
    const navigate = useNavigate();
    const newPassword = watch("new_password", "");

    const onSubmit = async values => {
        console.log(values)
        navigate(-1)
        // try {
        //     const formData = await formDataHandler(values)
        //     const res = await fileProvider.put(`/api/auth/user-edit/${user.id}`, formData)

        //     if (res.status >= 200 && res.status < 300) {
        //         renewToken(dispatch, user)
        //         navigate(-1)
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
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
                            name='password'
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
                            name='new_password'
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
                            name='new_password_confirm'
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
