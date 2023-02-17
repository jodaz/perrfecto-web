import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { useAuth, renewToken } from '../../context/AuthContext'
import SwitchInput from '../../components/Forms/SwitchInput';
import { apiProvider, fileProvider } from '../../api';
import formDataHandler from '../../utils/formDataHandler';

const PreferencesForm = () => {
    const [error, setError] = React.useState('')
    const { state: { user }, dispatch } = useAuth();
    const { control, handleSubmit, watch } = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            enable_notifications: user.enable_notifications,
            three_day_alert: user.three_day_alert,
            receive_alerts: user.receive_alerts
        }
    });

    const onSubmit = async values => {
        try {
            const formData = await formDataHandler(values)
            const res = await fileProvider.put(`/api/auth/user-edit/${user.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
            }
        } catch (error) {
            setError('Ha ocurrido un error inesperado.')
        }
    }

    React.useEffect(() => {
        const subscription = watch(handleSubmit(onSubmit))

        return () => subscription.unsubscribe();
    }, [handleSubmit, watch])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            p: 1
        }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <SwitchInput
                label="Activar todas las notificaciones"
                control={control}
                name='enable_notifications'
            />
            <SwitchInput
                label="Recibir alertas de mensajes"
                control={control}
                name='receive_alerts'
            />
            <SwitchInput
                label="Alerta de 3 días sobre mi plan"
                control={control}
                name='three_day_alert'
            />
        </Box>
    );
}

export default PreferencesForm
