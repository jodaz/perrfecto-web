import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fileProvider } from '../../../api';
import formDataHandler from '../../../utils/formDataHandler'
import { useForm } from 'react-hook-form';
import { clearForm, useMultiStepForm } from '../../../context/MultiStepContext';
import PublicationWait from '../../../components/Modals/PublicationWait';
import OverlayLoader from '../../../components/Modals/OverlayLoader';
import { useNavigate } from 'react-router-dom';
import { useAuth, renewToken } from '../../../context/AuthContext';

const Step4 = () => {
    const [openWarning, setOpenWarning] = React.useState(false)
    const [openOverlayLoader, setOpenOverlayLoader] = React.useState(false)
    const navigate = useNavigate()
    const { state: { user }, dispatchAuth } = useAuth();
    const { state, dispatch } = useMultiStepForm();
    const { handleSubmit } = useForm();

    const onSubmit = async () => {
        setOpenOverlayLoader(true)
        const {
            category,
            province,
            city,
            ...restData
        } = state

        const data = {
            ...restData,
            email: 'prueba@prueba.com',
            id_category: category.id,
            province: province.nombre,
            city: city.nombre
        }

        const formData = await formDataHandler(data, 'files')

        try {
            const res = await fileProvider.post('/api/business-ann/new', formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatchAuth, user)
                setOpenWarning(true)
                setOpenOverlayLoader(false)

                clearForm(dispatch)
                navigate('/businesses')
            }
        } catch (error) {
            // setOpenOverlayLoader(false)
            console.log(error)
        }
    }

    const handleCloseWarning = () => {
        setOpenWarning(false);
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
            <PublicationWait open={openWarning} handleClose={handleCloseWarning} />
            <OverlayLoader open={openOverlayLoader} />
        </Box>
    );
}

export default Step4
