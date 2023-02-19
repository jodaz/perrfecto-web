import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GalleryInput from '../../../components/GalleryInput'
import { ADD_PHOTOS } from '../../../validations';
import { useForm } from 'react-hook-form';
import { saveStep, useMultiStepForm } from '../../../context/MultiStepContext';
import { useNavigate } from 'react-router-dom';
import Stepper from '../Stepper';
import Tooltip from '@mui/material/Tooltip';
import { Info } from 'lucide-react'
import StepsFormButtons from '../StepsFormButtons';

const CreateBusinessStep3 = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useMultiStepForm();
    const { control, handleSubmit, setValue } = useForm();

    const onSubmit = data => {
        saveStep(dispatch, data);
        navigate('/businesses/create/step-4')
    }

    React.useEffect(() => {
        if (Object.keys(state).length) {
            setValue('files', state.files);
        }
    }, [Object.keys(state).length])

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stepper
                title='PASO 3'
                type="create"
            />
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
                />
            </Box>
            <StepsFormButtons next='Revisa tu publicación' />
        </Box>
    );
}

export default CreateBusinessStep3
