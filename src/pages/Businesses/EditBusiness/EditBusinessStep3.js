import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GalleryInput from '../../../components/GalleryInput'
import { ADD_PHOTOS } from '../../../validations';
import { useForm } from 'react-hook-form';
import { saveStep, useMultiStepForm } from '../../../context/MultiStepContext';
import { useNavigate } from 'react-router-dom';
import Stepper from '../Stepper';
import { useAuth, renewToken } from '../../../context/AuthContext';
import DeletePhotoWarning from '../../../components/Modals/DeletePhotoWarning';

const EditBusinessStep3 = () => {
    const [openDeletePhoto, setOpenDeletePhoto] = React.useState(false);
    const [selectedPhoto, setSelectedPhoto] = React.useState(null)
    const navigate = useNavigate()
    const { dispatch } = useMultiStepForm();
    const { control, handleSubmit, setValue } = useForm();
    const { state: { user } } = useAuth();

    const onSubmit = data => {
        saveStep(dispatch, data);
        navigate('/businesses/edit/step-4')
    }

    const handleOpenDeletePhoto = (file) => {
        setOpenDeletePhoto(true);
        setSelectedPhoto(file)
    }

    const handleCloseDeletePhoto = () => {
        setOpenDeletePhoto(false)
        setSelectedPhoto(null)
    }

    React.useEffect(() => {
        setValue("files", user.publication.AnnMultimedia.map(item => item.name))
    }, [user.publication.AnnMultimedia.length])

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stepper title='PASO 3' type='edit' />
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                >
                    Ingresar imágenes que identifiquen al negocio
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <GalleryInput
                    control={control}
                    name='files'
                    rules={ADD_PHOTOS.rules}
                    validations={ADD_PHOTOS.messages}
                    deletePhotoHandler={handleOpenDeletePhoto}
                />
            </Box>
            <Box sx={{ p: 2 }}>
                <Button
                    variant='contained'
                    type='submit'
                >
                    Siguiente
                </Button>
            </Box>
            {(selectedPhoto) && (
                <DeletePhotoWarning
                    open={openDeletePhoto}
                    handleClose={handleCloseDeletePhoto}
                    file={selectedPhoto}
                    endpoint={`api/business-ann/file`}
                    sideAction={() => renewToken(dispatch, user)}
                />
            )}
        </Box>
    );
}

export default EditBusinessStep3
