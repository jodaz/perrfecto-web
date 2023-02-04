import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    EMAIL,
    PHONE
} from '../../validations'
import { useAuth } from '../../context/AuthContext';
import TextInput from '../../components/Forms/TextInput';
import PhoneInput from '../../components/Forms/PhoneInput';

const UpdateEmailAndPhone = () => {
    const { state: { user }, dispatch } = useAuth();
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            email: user.email,
            phone: user.tlf
        }
    });
    const navigate = useNavigate();

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
                            control={control}
                            name='email'
                            label="Email"
                            placeholder='Ingrese su email'
                            rules={EMAIL.rules}
                            validations={EMAIL.messages}
                            disabled={isSubmitting}
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <PhoneInput
                            label="Teléfono"
                            control={control}
                            name="phone"
                            rules={PHONE.rules}
                            validations={PHONE.messages}
                            placeholder='Ingresar teléfono'
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

export default UpdateEmailAndPhone
