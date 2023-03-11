import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GalleryInput from '../../../components/GalleryInput'
import { ADD_PHOTOS } from '../../../validations';
import { useForm } from 'react-hook-form';
import { saveStep, useMultiStepForm } from '../../../context/MultiStepContext';
import { useNavigate } from 'react-router-dom';
import Stepper from '../Stepper';
import { useAuth } from '../../../context/AuthContext';
import Tooltip from '@mui/material/Tooltip';
import { Info } from 'lucide-react'
import DeletePhotoWarning from '../../../components/Modals/DeletePhotoWarning';
import StepsFormButtons from '../StepsFormButtons';

const EditBusinessStep3 = () => {
    const [openDeletePhoto, setOpenDeletePhoto] = React.useState(false);
    const [selectedPhoto, setSelectedPhoto] = React.useState(null)
    const navigate = useNavigate()
    const { state, dispatch } = useMultiStepForm();
    const { control, handleSubmit, setValue, getValues } = useForm();
    const { state: { user } } = useAuth();

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

    const sideAction = ({ name }) => {
        const files = getValues('files')
        const newFiles = files.filter(file => file != name);

        saveStep(dispatch, {
            ...state,
            files: newFiles
        });
    }

    React.useEffect(() => {
        setValue("files", state.files)
    }, [state])

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
                    message='Tienes un máximo de 5 fotos'
                    maxFiles={5}
                />
            </Box>
            <StepsFormButtons next='Revisa tu publicación' />
            {(selectedPhoto) && (
                <DeletePhotoWarning
                    open={openDeletePhoto}
                    handleClose={handleCloseDeletePhoto}
                    file={selectedPhoto.id}
                    endpoint={`api/business-ann/file`}
                    sideAction={() => sideAction(selectedPhoto)}
                />
            )}
        </Box>
    );
}

export default EditBusinessStep3
