import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
    const { control, handleSubmit, isSubmitting } = useForm();

    const onSubmit = async ({ files }) => {
        let formData = new FormData();

        try {
            if (files.length) {
                for (let i = 0; i < files.length; i++) {
                    console.log(files[i][0])
                    // formData.append('files', files[i]);
                }

                console.log(formData)

                // const formData = await formDataHandler(formData, 'personalPhotos')

                // const res = await fileProvider.put(`/api/user/personal-photos`, formData)

                // if (res.status >= 200 && res.status < 300) {
                //     renewToken(dispatch, user)
                // }
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

    return (
        <SettingsLayout title='Fotos personales'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Typography textAlign="center" color="text.tertiary" sx={{ p: 2 }}>
                        Estas fotos serán visibles para todos los usuarios.
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Box sx={{ p: 2, display: 'flex' }}>
                            <PhotoInput
                                name="files[1]"
                                control={control}
                                handleDelete={deletePhoto}
                            />
                        </Box>
                        <Box sx={{ p: 2, display: 'flex' }}>
                            <PhotoInput
                                name="files[2]"
                                control={control}
                                handleDelete={deletePhoto}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default EditOwnerProfilePictures
