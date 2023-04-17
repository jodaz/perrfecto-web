import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import PasswordInput from '../../Forms/PasswordInput';
import { apiProvider } from '../../../api'
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { CONFIRM_PASSWORD, PASSWORD } from '../../../validations'
import vars from '../../../vars';

const NewPasswordForm = ({ location }) => {
    const navigate = useNavigate()
    const [error, setError] = React.useState(false);
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const password = watch("password", "");

    const onSubmit = async data => {
        setError(false);
        try {
            const res = await apiProvider.post('/api/auth/update-password-reset', data)

            if (res.status >= 200 && res.status < 300) {
                await localStorage.removeItem(vars.authToken)
                navigate('?success=true')
            }
        } catch(error) {
            setError(true)
        };
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
                <Box sx={{ p: 1 }}>
                    <PasswordInput
                        label='Contraseña'
                        control={control}
                        name="password"
                        rules={PASSWORD.rules}
                        validations={PASSWORD.messages}
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
                            ...CONFIRM_PASSWORD.rules,
                            validate: value => value === password
                        }}
                        validations={CONFIRM_PASSWORD.messages}
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
