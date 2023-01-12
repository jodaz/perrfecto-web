import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fileProvider } from '../../../api';
import formDataHandler from '../../../utils/formDataHandler'
import { useForm } from 'react-hook-form';
import { clearForm, useMultiStepForm } from '../../../context/MultiStepContext';
import { useNavigate } from 'react-router-dom';
import { useAuth, renewToken } from '../../../context/AuthContext';

const Step4 = () => {
    const navigate = useNavigate()
    const { state: { user }, dispatchAuth } = useAuth();
    const { state, dispatch } = useMultiStepForm();
    const { handleSubmit } = useForm();

    const onSubmit = async () => {
        const {
            category,
            province,
            city,
            ...restData
        } = state

        const data = {
            ...restData,
            id_category: category.id,
            province: province.nombre,
            city: city.nombre
        }

        const formData = await formDataHandler(data, 'files')

        try {
            const res = await fileProvider.post('/api/business-ann/new', formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatchAuth, user)
                // setOpenWarning(true)
                // setOpenOverlayLoader(false)

                clearForm(dispatch)
                navigate('/businesses')
            }
        } catch (error) {
            // setOpenOverlayLoader(false)
            console.log(error)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.primary"
                    fontWeight={500}
                    textAlign='left'
                >
                    Fijate como quedó tú anuncio
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Button
                    variant='contained'
                    type='submit'
                >
                    Publicar
                </Button>
            </Box>
        </Box>
    );
}

export default Step4
