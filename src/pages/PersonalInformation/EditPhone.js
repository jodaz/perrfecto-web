import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '../../components/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import PhoneInput from '../../components/Forms/PhoneInput';
import { apiProvider } from '../../api';
import { PHONE } from '../../validations'
import VerifyPhone from '../../components/Modals/VerifyPhone';

const EditPhone = () => {
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
            phone: user.phone,
            code_phone: user.code_phone
        }))
    });

    const toggleVerifyPhone = () => setOpenVerifyPhone(!openVerifyPhone);

    /**
     * Cuando pida un nuevo codigo, el boton submit debe quedar cargando
     * y el campo deshabilitado
     */
    const verifyPhone = async (values) => {
        try {
            const response = await apiProvider.put('/api/user/phone', values)

            if (response.status >= 200 && response.status < 300) {
                setPhoneValues(values)
                return toggleVerifyPhone() // Abre modal de verificación
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

    const onSubmit = React.useCallback(values => {
        // Valida el numero de telefono solo si no ha sido validado antes
        return verifyPhone({
            phone: values.phone,
            code_phone: values.code_phone
        })
    }, [user.code_phone, user.phone, isVerified]);

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
                        <PhoneInput
                            label="Teléfono"
                            control={control}
                            name="phone"
                            rules={PHONE.rules}
                            validations={PHONE.messages}
                            placeholder='Ingresar teléfono'
                            defaultCodePhone={user.code_phone}
                            disabled={isSubmitting}
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
            {(openVerifyPhone) && (
                <VerifyPhone
                    open={openVerifyPhone}
                    data={phoneValues}
                    handleClose={toggleVerifyPhone}
                    endpoint='/api/user/confirm-change-phone'
                    updateStatus={() => {
                        setIsVerified(true)
                        renewToken(dispatch, user)
                        setPhoneValues(null)
                        navigate(-1)
                    }}
                />
            )}
        </SettingsLayout>
    );
}

export default EditPhone
