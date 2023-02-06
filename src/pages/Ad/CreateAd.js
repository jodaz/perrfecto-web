import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from "react-hook-form";
import { useAuth, renewToken } from '../../context/AuthContext'
import TextInput from '../../components/Forms/TextInput';
import SwitchInput from '../../components/Forms/SwitchInput';
import { apiProvider, fileProvider } from '../../api';
import GalleryInput from '../../components/GalleryInput';
import InterestInput from '../../components/InterestInput';
import formDataHandler from '../../utils/formDataHandler';
import PublicationWait from '../../components/Modals/PublicationWait';
import OverlayLoader from '../../components/Modals/OverlayLoader';
import useEffectOnce from '../../utils/useEffectOnce'
import DogInformation from './DogInformation';
import { DESCRIPTION, ADD_PHOTOS } from '../../validations';
import { Info } from 'lucide-react'

const CreateAd = () => {
    const [openWarning, setOpenWarning] = React.useState(false)
    const [openOverlayLoader, setOpenOverlayLoader] = React.useState(false)
    const [interests, setInterests] = React.useState([])
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            permission_tlf: true,
            permission_whatsapp: true,
            permission_geolocation: true
        }
    });
    const { state: { user }, dispatch } = useAuth();
    const insterestsValues = watch('interests')

    const onSubmit = async data => {
        setOpenOverlayLoader(true)
        const formData = await formDataHandler(data, 'files')

        try {
            const res = await fileProvider.post('/api/publication/new', formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
                setOpenWarning(true)
                setOpenOverlayLoader(false)
            }
        } catch (error) {
            setOpenOverlayLoader(false)
            console.log(error)
        }
    };

    const fetchInterests = async () => {
        try {
            const res = await apiProvider.get('api/interest/interests')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setInterests(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    useEffectOnce(() => { fetchInterests() }, []);

    const handleCloseWarning = () => {
        setOpenWarning(false);
    }

    return (
        <SettingsLayout
            title='Crear anuncio'
            rightIconComponent={
                <Tooltip
                    title='Recuerda que puedes añadir imágenes de 800px por 800px de mínimo y 1080px por 1080px de máximo'
                >
                    <Box p={2} color="text.tertiary">
                        <Info />
                    </Box>
                </Tooltip>
            }
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ p: 2 }}>
                    <GalleryInput
                        control={control}
                        name='files'
                        rules={ADD_PHOTOS.rules}
                        validations={ADD_PHOTOS.messages}
                        maxFiles={15}
                        accept={{
                            'image/*': []
                        }}
                        message='Tienes un máximo de 15 fotos disponibles'
                    />
                </Box>
                <Box sx={{ p: 2 }} id="interests-drawer-container">
                    <DogInformation hideInterests />
                    <Box sx={{ pt: 2, pb: 2 }}>
                        <InterestInput
                            control={control}
                            options={interests}
                            currentValues={insterestsValues}
                            isSubmitting={isSubmitting}
                        />
                    </Box>
                    <Box sx={{ pt: 2, pb: 2, color: 'black' }}>
                        <TextInput
                            name='description'
                            control={control}
                            label='Descripción:'
                            placeholder='Escribir aquí'
                            multiline
                            maxRows={4}
                            rows={4}
                            labelColor="text"
                            rules={DESCRIPTION.rules}
                            validations={DESCRIPTION.messages}
                            sx={{
                                border: 'none !important',
                                padding: 0,
                                '&.Mui-focused': {
                                    boxShadow: 'none',
                                    borderColor: 'none'
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.tertiary"
                            textTransform='uppercase'
                            gutterBottom
                        >
                            Permisos
                        </Typography>
                        <SwitchInput
                            label="Visualizar número de teléfono"
                            control={control}
                            name='permission_tlf'
                        />
                        <SwitchInput
                            label='Activar geolocalización'
                            control={control}
                            name='permission_geolocation'
                        />
                        <SwitchInput
                            label='Habilitar Whatsapp'
                            control={control}
                            name='permission_whatsapp'
                        />
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
            </Box>
            <PublicationWait open={openWarning} handleClose={handleCloseWarning} />
            <OverlayLoader open={openOverlayLoader} />
        </SettingsLayout>
    );
}

export default CreateAd
