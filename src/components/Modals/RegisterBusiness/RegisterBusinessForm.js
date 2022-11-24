import * as React from 'react';
import Button from '../../Button';
import PasswordInput from '../../Forms/PasswordInput'
import Checkbox from '../../Forms/Checkbox'
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextInput from '../../Forms/TextInput';
import { useNavigate } from 'react-router-dom';
import PhoneInput from '../../Forms/PhoneInput'
import { useAuth, loginUser } from '../../../context/AuthContext'
import { fileProvider } from '../../../api'

const validations = {
    name: {
        required: "Ingrese su nombre"
    },
    business_name: {
        required: "Ingrese el nombre de su negocio."
    },
    business_dir: {
        required: "Ingrese la dirección su negocio."
    },
    email: {
        required: "Ingrese su correo",
        pattern: "Email inválido"
    },
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
    name: {
        required: true,
    },
    business_name: {
        required: true,
    },
    business_dir: {
        required: true,
    },
    email: {
        required: true,
        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        required: true,
        minLength: 6
    },
    confirm: {
        required: true,
        minLength: 6
    }
}

const RegisterBusinessForm = ({ location }) => {
    const navigate = useNavigate()
    const [error, setError] = React.useState(false)
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const password = watch("password", "");
    const { dispatch } = useAuth();

    const onSubmit = async (data) => {
        setError(false);
        const formData = new FormData()

        await Object.keys(data).forEach((key) => {
            formData.append(key, data[key])
        })
        formData.append('role', 'business')
        formData.append('code_phone', '+58')
        formData.append('phone', '04161234567')

        const res = await fileProvider.post('/api/auth/new-business', formData)
            .catch(error => {
            if (error.response.status == 401) {
                setError(true)
            }
        });

        if (res.status >= 200 && res.status < 300) {
            const { data } = res;

            loginUser(dispatch, data)
            navigate('/home')
        }
    };

    return (
        <Box sx={{
            m: 1,
            display: 'flex',
            height: 'fit-content',
            p: 3,
            color: theme => theme.palette.text.secondary
        }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ m: 1, flex: 1 }}>
                <Box sx={{ p: 1 }}>
                    <TextInput
                        label="Nombre"
                        control={control}
                        name="business_name"
                        placeholder='Ingresar nombre de tu negocio'
                        rules={rules.business_name}
                        validations={validations}
                        disabled={isSubmitting}
                    />
                </Box>
                <Box sx={{ p: 1 }}>
                    <TextInput
                        label="Nombre del encargado"
                        control={control}
                        name="name"
                        placeholder='Ingresar nombre del propietario'
                        rules={rules.name}
                        validations={validations}
                        disabled={isSubmitting}
                    />
                </Box>
                {/* <Box sx={{ p: 1 }}>
                    <PhoneInput
                        label="Teléfono"
                        control={control}
                        name="phone"
                        placeholder='Ingresar teléfono'
                    />
                </Box> */}
                <Box sx={{ p: 1 }}>
                    <TextInput
                        label="Dirección"
                        control={control}
                        name="business_dir"
                        placeholder='Ingresar la dirección de tu negocio'
                        rules={rules.name}
                        validations={validations}
                        disabled={isSubmitting}
                    />
                </Box>
                <Box sx={{ p: 1 }}>
                    <TextInput
                        label="Email"
                        control={control}
                        name="email"
                        type="email"
                        rules={rules.email}
                        validations={validations}
                        disabled={isSubmitting}
                        placeholder='Ingresar el correo de tu negocio'
                    />
                </Box>
                <Box sx={{ p: 1 }}>
                    <PasswordInput
                        label='Contraseña'
                        control={control}
                        name="password"
                        rules={rules.password}
                        validations={validations}
                        disabled={isSubmitting}
                        placeholder='Ingresar una contraseña'
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
                    <Checkbox
                        control={control}
                        name='remember_me'
                        label='Recordar contraseña'
                    />
                </Box>
                <Box textAlign='center'>
                    <Box sx={{ p: 1 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Siguiente
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default RegisterBusinessForm
