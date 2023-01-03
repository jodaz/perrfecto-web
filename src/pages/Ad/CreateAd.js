import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from "react-hook-form";
import { useAuth, renewToken } from '../../context/AuthContext'
import TextInput from '../../components/Forms/TextInput';
import SwitchInput from '../../components/Forms/SwitchInput';
import { apiProvider, fileProvider } from '../../api';
import AdPhotoInput from '../../components/AdPhotoInput';
import InterestInput from '../../components/InterestInput';
import formDataHandler from '../../utils/formDataHandler';
import PublicationWait from '../../components/Modals/PublicationWait';
import OverlayLoader from '../../components/Modals/OverlayLoader';
import useEffectOnce from '../../utils/useEffectOnce'
import DogInformation from './DogInformation';
import { DESCRIPTION, AD_PHOTOS } from '../../validations';

const SwitchInputContainer = ({
    control,
    label,
    name
}) => (
    <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 1
    }}>
        <Typography variant="subtitle1" color="text.secondary">
            {label}
        </Typography>
        <SwitchInput
            control={control}
            name={name}
        />
    </Box>
)

const CreateAd = () => {
    const [openWarning, setOpenWarning] = React.useState(false)
    const [openOverlayLoader, setOpenOverlayLoader] = React.useState(false)
    const [interests, setInterests] = React.useState([])
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const { state: { user }, dispatch } = useAuth();
    const insterestsValues = watch('interests')

    const onSubmit = async (data) => {
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
        <SettingsLayout title='Crear anuncio'>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ p: 2 }}>
                    <AdPhotoInput
                        control={control}
                        name='files'
                        rules={AD_PHOTOS.rules}
                        validations={AD_PHOTOS.messages}
                    />
                </Box>
                <Box sx={{ p: 2 }} id="drawer-container">
                    <DogInformation />
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
                        <SwitchInputContainer
                            label='Visualizar número de teléfono'
                            control={control}
                            name='permission_tlf'
                        />
                        <SwitchInputContainer
                            label='Activar geolocalización'
                            control={control}
                            name='permission_geolocation'
                        />
                        <SwitchInputContainer
                            label='Habilitar Whatsapp'
                            control={control}
                            name='permission_whatsapp'
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button variant="contained" type="submit" fullWidth>
                            Enviar
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
