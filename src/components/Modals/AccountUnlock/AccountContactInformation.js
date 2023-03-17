import * as React from 'react';
import Box from '@mui/material/Box';
import { apiProvider } from '../../../api'
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import TextInput from '../../Forms/TextInput';
import PhoneInput from '../../Forms/PhoneInput'
import { useNavigate } from 'react-router-dom';
import { PHONE, EMAIL } from '../../../validations'

const AccountContactInformation = ({ location }) => {
    const navigate = useNavigate()
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = async (values) => {
        try {
            const { state } = location;

            const res = await apiProvider.post('/api/unlock-account/new-request', {
                ...state,
                ...values
            })

            if (res.status >= 200 && res.status < 300) {
                navigate('?success=true')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                m: 1,
                flex: 1,
                width: '100%'
            }}
        >
            <Box sx={{ p: 1 }}>
                <TextInput
                    name='email'
                    control={control}
                    placeholder='email@ejemplo.com'
                    label='Email'
                    rules={EMAIL.rules}
                    validations={EMAIL.messages}
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
