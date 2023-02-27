import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import TextInput from '../../components/Forms/TextInput';
import PhoneInput from '../../components/Forms/PhoneInput';
import formDataHandler from '../../utils/formDataHandler';
import { apiProvider, fileProvider } from '../../api';
import {
    PHONE,
    EMAIL
} from '../../validations'
import VerifyPhone from '../../components/Modals/VerifyPhone';

const UpdateEmailAndPhone = () => {
    const { state: { user }, dispatch } = useAuth();
    const [phoneValues, setPhoneValues] = React.useState(null)
    const [openVerifyPhone, setOpenVerifyPhone] = React.useState(false)
    const [isVerified, setIsVerified] = React.useState(false);
    const navigate = useNavigate()
    const { control, handleSubmit, setError, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({
            email: user.email,
            phone: user.phone,
            code_phone: user.code_phone
        }))
    });

    const toggleVerifyPhone = () => setOpenVerifyPhone(!openVerifyPhone);

    /**
     * Cuando pida un nuevo codigo, el boton submit debe quedar cargando
     * y el campo deshabilitado
     */
    const verifyPhone = async () => {
        try {
            const response = await apiProvider.put('/api/user/phone', phoneValues)

            if (response.status >= 200 && response.status < 300) {
                toggleVerifyPhone() // Abre modal de verificación
            }
        } catch (error) {
            if (error.response.data.msg) {
                const message = error.response.data.msg;

                if (message.includes(' There was a problem')) {
                    setError('phone', {
                        type: 'unique'
                    })
                }
            }
        }
    };

    const updateAccountAccess = async () => {
        try {
            const formData = await formDataHandler(values)
            const res = await fileProvider.put(`/api/auth/user-edit/${user.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
                setPhoneValues(null)
                navigate(-1)
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
    }

    const onSubmit = async values => {
        // Valida el numero de telefono solo si no ha sido validado antes
        if ((values.phone != user.phone) || (values.code_phone != user.code_phone) && !isVerified) {
            await setPhoneValues({
                phone: values.phone,
                code_phone: values.code_phone
            })

            await verifyPhone()
        } else {
            await updateAccountAccess()
        }
    }

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
                    <Box sx={{ p: 2 }}>
                        <PhoneInput
                            label="Teléfono"
                            control={control}
                            name="phone"
                            rules={PHONE.rules}
                            validations={PHONE.messages}
                            placeholder='Ingresar teléfono'
                            defaultCodePhone={user.code_phone}
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
                {(openVerifyPhone) && (
                    <VerifyPhone
                        open={openVerifyPhone}
                        data={phoneValues}
                        handleClose={toggleVerifyPhone}
                        updateStatus={() => {
                            setIsVerified(true)
                            renewToken(dispatch, user)
                        }}
                    />
                )}
            </Box>
        </SettingsLayout>
    );
}

export default UpdateEmailAndPhone
