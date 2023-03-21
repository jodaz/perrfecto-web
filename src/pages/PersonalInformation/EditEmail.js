import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '../../components/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import TextInput from '../../components/Forms/TextInput';
import formDataHandler from '../../utils/formDataHandler';
import { fileProvider } from '../../api';
import { EMAIL } from '../../validations'

const EditEmail = () => {
    const { state: { user }, dispatch } = useAuth();
    const navigate = useNavigate()
    const { control, handleSubmit, setError, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({
            email: user.email,
        }))
    });

    const onSubmit = React.useCallback(async values => {
        try {
            const formData = await formDataHandler({
                email: values.email
            })
            const res = await fileProvider.put(`/api/auth/user-edit/${user.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                navigate(-1)
                renewToken(dispatch, user)
            }
        } catch (error) {
            if (error.response.data.msg) {
                const message = error.response.data.msg;

                if (message.includes('There is a user with the provided email')) {
                    setError('email', {
                       type: 'unique'
                    })
                }
            }
        }
    }, []);

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
                            label="Email"
                            control={control}
                            name="email"
                            type="email"
                            rules={EMAIL.rules}
                            validations={EMAIL.messages}
                            disabled={isSubmitting}
                            defaultValue={user.email}
                            placeholder='Ingresar correo electrónico'
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

export default EditEmail
