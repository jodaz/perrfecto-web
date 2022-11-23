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
        required: "Ingrese una contraseña",
        minLength: "Mínimo 6 caracteres"
    },
    confirm: {
        required: "Repita la contraseña",
        minLength: "Mínimo 6 caracteres",
        validate: "Las contraseñas no coinciden."
    }
}

const rules = {
    password: {
        required: true,
        minLength: 6
    },
    confirm: {
        required: true,
        minLength: 6
    }
}

const NewPasswordForm = ({ location }) => {
    const navigate = useNavigate()
    const { state } = location
    const [error, setError] = React.useState(false);
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const password = watch("password", "");

    const onSubmit = async (data) => {
        const { email } = state
        const res = await apiProvider.post('/api/auth/update-password', {
            ...data,
            email: email
        }).catch(error => {
            console.log(error)
        });

        if (res.status >= 200 && res.status < 300) {
            navigate('?success=true')
        } else {
            setError(true)
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
                        name="confirm"
                        rules={{
                            ...rules.confirm,
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
