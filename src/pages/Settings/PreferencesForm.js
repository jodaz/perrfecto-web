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
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            notifications: true,
            alerts_plan: true,
            alerts: false
        }
    });

    const onSubmit = async (data) => {
        // try {
        //     const parsedData = {
        //         files: data.files,
        //         body: {
        //             img_delete: user.img_profile ? user.img_profile : null
        //         }
        //     }

        //     const formData = await formDataHandler(parsedData, 'files')

        //     const res = await fileProvider.put(`/api/dog/img-dog/${user.dog.id}`, formData)

        //     if (res.status >= 200 && res.status < 300) {
        //         renewToken(dispatch, user)
        //     }
        // } catch (error) {
        //     setError('Ha ocurrido un error inesperado.')
        // }
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
                name='notifications'
            />
            <SwitchInput
                label="Recibir alertas de mensajes"
                control={control}
                name='alerts'
            />
            <SwitchInput
                label="Alerta de 3 días sobre mi plan"
                control={control}
                name='alerts_plan'
            />
        </Box>
    );
}

export default PreferencesForm
