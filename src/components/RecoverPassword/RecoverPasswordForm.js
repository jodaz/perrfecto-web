import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import TextInput from '../Forms/TextInput';
import { apiProvider } from '../../api'
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import CircularProgress from '@mui/material/CircularProgress';
import PhoneInput from '../Forms/PhoneInput';
import { PHONE, EMAIL } from '../../validations'

const endpoints = [
    '/api/auth/reset-password',
    '/api/auth/reset-password-phone'
]

const RecoverPasswordForm = ({ method }) => {
    const navigate = useNavigate()
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = async (formData) => {
        const endpoint = (method == 'email') ? endpoints[0] : endpoints[1];

        const response = await apiProvider.post(endpoint, formData)
            .catch(error => {
                console.log(error)
            });

        if (response.status >= 200 || response.status < 300) {
            navigate(
                `?method=${method}&success=true`,
                {
                    state: {
                        ...formData,
                        method: method
                    }
                }
            )
        }
    };

    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    m: 1,
                    flex: 1
                }}
            >
                {(isSubmitting) ? (
                    <Box sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                        <CircularProgress color="divider" />
                    </Box>
                ) : (
                    <>
                        <Box sx={{ p: 1 }}>
                            {method == 'sms' ? (
                                <PhoneInput
                                    label="Teléfono"
                                    control={control}
                                    name="phone"
                                    placeholder='Ingresar teléfono'
                                    rules={PHONE.rules}
                                    validations={PHONE.messages}
                                />
                            ) : (
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
                            )}
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                            >
                                Continuar
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default RecoverPasswordForm
