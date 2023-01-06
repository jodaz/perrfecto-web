import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext'
import PhotoInput from '../../components/Forms/PhotoInput';
import { fileProvider, apiProvider } from '../../api'
import formDataHandler from '../../utils/formDataHandler';

const EditOwnerProfilePictures = () => {
    const [error, setError] = React.useState(null);
    const { state: { user }, dispatch } = useAuth();
    const { handleSubmit, control, watch } = useForm();

    const onSubmit = async (data) => {
        try {
            const parsedData = {
                personalPhotos: data.files
            }

            const formData = await formDataHandler(parsedData, 'personalPhotos')

            const res = await fileProvider.put(`/api/user/personal-photos`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
            }
        } catch (error) {
            setError('Ha ocurrido un error inesperado.')
        }
    }

    const deletePhoto = async (photo) => {
        try {
            const res = await apiProvider.delete(`/api/user/personal-photos/${photo}`)

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
        <SettingsLayout title='Fotos personales'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
            }}>
                <Typography textAlign="center" color="text.tertiary" sx={{ p: 2 }}>
                    Estas fotos serán visibles para todos los usuarios.
                </Typography>
                <Box sx={{
                    display: 'flex'
                }}>
                    <Box sx={{ p: 2, display: 'flex' }}>
                        <PhotoInput
                            name="files"
                            control={control}
                            handleDelete={deletePhoto}
                        />
                    </Box>
                    <Box sx={{ p: 2, display: 'flex' }}>
                        <PhotoInput
                            name="files"
                            control={control}
                            handleDelete={deletePhoto}
                        />
                    </Box>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default EditOwnerProfilePictures
