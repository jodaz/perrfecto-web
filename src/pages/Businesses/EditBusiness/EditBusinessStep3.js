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
import Tooltip from '@mui/material/Tooltip';
import { Info } from 'lucide-react'
import DeletePhotoWarning from '../../../components/Modals/DeletePhotoWarning';

const EditBusinessStep3 = () => {
    const [openDeletePhoto, setOpenDeletePhoto] = React.useState(false);
    const [selectedPhoto, setSelectedPhoto] = React.useState(null)
    const navigate = useNavigate()
    const { dispatch } = useMultiStepForm();
    const { control, handleSubmit, setValue } = useForm();
    const { state: { user }, dispatch: authDispatch } = useAuth();

    const onSubmit = data => {
        saveStep(dispatch, data);
        navigate('/businesses/edit/step-4')
    }

    const handleOpenDeletePhoto = fileName => {
        const file = user.publication.AnnMultimedia.find(({ name }) => name == fileName)

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
                    <Tooltip
                        title='Recuerda que puedes añadir imágenes de 800px por 800px de mínimo y 1080px por 1080px de máximo'
                    >
                        <Box
                            color="text.tertiary"
                            display="inline"
                            ml={1}
                        >
                            <Info />
                        </Box>
                    </Tooltip>
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
                    file={selectedPhoto.id}
                    endpoint={`api/business-ann/file`}
                    sideAction={() => renewToken(authDispatch, user)}
                />
            )}
        </Box>
    );
}

export default EditBusinessStep3
