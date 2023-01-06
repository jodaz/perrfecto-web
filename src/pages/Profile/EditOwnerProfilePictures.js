import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext'
import { fileProvider, apiProvider } from '../../api'
import { AD_PHOTOS } from '../../validations';
import useEffectOnce from '../../utils/useEffectOnce';
import AdPhotoInput from '../../components/AdPhotoInput'
import DeletePhotoWarning from '../../components/Modals/DeletePhotoWarning';

const EditOwnerProfilePictures = () => {
    const [error, setError] = React.useState(null);
    const [selectedPhoto, setSelectedPhoto] = React.useState(null)
    const [openDeletePhoto, setOpenDeletePhoto] = React.useState(false);
    const { state: { user }, dispatch } = useAuth();
    const { control, handleSubmit, isSubmitting, setValue } = useForm();

    const onSubmit = async ({ files }) => {
        let formData = new FormData();

        try {
            if (files.length) {
                const keepedFiles = files.filter(file => typeof(file) == 'object')

                for (let i = 0; i < keepedFiles.length; i++) {
                    formData.append('files', keepedFiles[i][0]);
                }

                const res = await fileProvider.put(`/api/user/personal-photos`, formData)

                if (res.status >= 200 && res.status < 300) {
                    renewToken(dispatch, user)
                }
            }
        } catch (error) {
            setError('Ha ocurrido un error inesperado.')
        }
    }

    const fetchPictures = async () => {
        try {
            const res = await apiProvider.get('api/user/personal-photos')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setValue('files', data)
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const handleOpenDeletePhoto = (file) => {
        setOpenDeletePhoto(true);
        setSelectedPhoto(file)
    }

    const handleCloseDeletePhoto = () => {
        setOpenDeletePhoto(false)
        setSelectedPhoto(null)
    }

    useEffectOnce(() => { fetchPictures() }, [])

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
                        <AdPhotoInput
                            control={control}
                            name='files'
                            rules={AD_PHOTOS.rules}
                            validations={AD_PHOTOS.messages}
                            deletePhotoHandler={handleOpenDeletePhoto}
                            accept={{
                                'image/*': []
                            }}
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
                        Guardar
                    </Button>
                </Box>
                <DeletePhotoWarning
                    open={openDeletePhoto}
                    handleClose={handleCloseDeletePhoto}
                    file={selectedPhoto}
                    endpoint={`api/user/personal-photos`}
                    sideAction={() => fetchPictures()}
                />
            </Box>
        </SettingsLayout>
    );
}

export default EditOwnerProfilePictures
