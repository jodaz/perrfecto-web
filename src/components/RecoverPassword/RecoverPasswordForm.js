import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import TextInput from '../Forms/TextInput';
import { apiProvider } from '../../api'
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import CircularProgress from '@mui/material/CircularProgress';

const validations = {
    email: {
        required: "Ingrese su correo",
        pattern: "Email inválido"
    }
}

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

    const onSubmit = async (data) => {
        const endpoint = (method == 'email') ? endpoints[0] : endpoints[1];

        const response = await apiProvider.post(endpoint, data)
            .catch(error => {
                console.log(error)
            });

        console.log(response)

        navigate(`?method=${method}&success=true`)
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
                            <TextInput
                                label="Email"
                                control={control}
                                name="email"
                                type="email"
                                rules={{
                                    required: true,
                                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                                }}
                                validations={validations}
                                disabled={isSubmitting}
                                placeholder='Ingresar correo electrónico'
                            />
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
