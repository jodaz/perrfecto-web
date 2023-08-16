import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import TextInput from '../../Forms/TextInput';
import PhoneInput from '../../Forms/PhoneInput'
import { useNavigate } from 'react-router-dom';
import { PHONE, EMAIL } from '../../../validations'

const AccountContactInformation = () => {
    const navigate = useNavigate()
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = async (values) => {
        navigate('?contact=true', {
            state: values
        })
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                m: 1,
                flex: 1
            }}
        >
            <Box sx={{ p: 1 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    fontWeight={500}
                >
                    Solicitud de desbloqueo de cuenta
                </Typography>
            </Box>
            <Box sx={{ p: 1 }}>
                <TextInput
                    name='email'
                    control={control}
                    placeholder='email@ejemplo.com'
                    label='Email'
                    rules={EMAIL.rules}
                    validations={EMAIL.messages}
                />
            </Box>
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
            <Box sx={{ p: 1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    );
}

export default AccountContactInformation
