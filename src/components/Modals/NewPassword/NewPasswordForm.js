import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import PasswordInput from '../../Forms/PasswordInput';
import { apiProvider } from '../../../api'
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const validations = {
    password: {
        required: "Ingrese una contraseña"
    },
    confirm_password: {
        required: "Repita la contraseña",
        validate: "Las contraseñas no coinciden."
    }
}

const rules = {
    password: {
        required: true,
    },
    confirm_password: {
        required: true,
    }
}

const NewPasswordForm = () => {
    const navigate = useNavigate()
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const password = watch("password", "");

    const onSubmit = async (data) => {
        // const response = await apiProvider.post('/api/auth/signin', {
        //     ...data,
        //     tipo: 1
        // }).catch(error => {
        //     console.log(error)
        // });
        navigate('?success=true')
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
                    flex: 1
                }}
            >
                <Typography color="text.secondary" variant="body2">
                    Tu contraseña debe tener mínimo  8 caracteres.
                    Recomendable un carácter especial y un carácter numérico
                </Typography>
                <Box sx={{ p: 1, mt: 2 }}>
                    <PasswordInput
                        label='Contraseña'
                        control={control}
                        name="password"
                        rules={rules.password}
                        validations={validations}
                        disabled={isSubmitting}
                        placeholder='Ingresar contraseña'
                    />
                </Box>
                <Box sx={{ p: 1 }}>
                    <PasswordInput
                        label='Confirmar contraseña'
                        control={control}
                        name="confirm_password"
                        rules={{
                            ...rules.confirm_password,
                            validate: value => value === password
                        }}
                        validations={validations}
                        disabled={isSubmitting}
                        placeholder='Repita la contraseña'
                    />
                </Box>
                <Box sx={{ p: 1 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {(isSubmitting) ? (
                            <CircularProgress color="text" size='29px' />
                        ) : (
                            <>Continuar</>
                        )}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default NewPasswordForm
