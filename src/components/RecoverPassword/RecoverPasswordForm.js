import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import TextInput from '../TextInput';
import { apiProvider } from '../../api'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const RecoverPasswordForm = () => {
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = async (data) => {
        const response = await apiProvider.post('/api/auth/signin', {
            ...data,
            tipo: 1
        }).catch(error => {
            console.log(error)
        });
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
