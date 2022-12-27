import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import { MapPin, Mail, Phone } from 'lucide-react';
import CircleIcon from '@mui/icons-material/FiberManualRecord';
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
import getYearsFromYear from '../../utils/getYearsFromYear';

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
    const { dog } = user
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
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <AdPhotoInput
                    control={control}
                    name='files'
                />
                <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', }}>
                        <Typography
                            variant="body2"
                            color="text.tertiary"
                            textTransform={'uppercase'}
                            gutterBottom
                        >
                            información de la mascota
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        textTransform='capitalize'
                        gutterBottom
                    >
                        {dog.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}>
                            {/** Raza */}
                            <Typography color="primary.main">
                                {dog.breed}
                            </Typography>
                            <Box sx={{ fontSize: '6px', padding: '0 8px' }}>
                                <CircleIcon fontSize='inherit' color='primary' />
                            </Box>
                            <Typography color="primary.main">
                                {getYearsFromYear(dog.dogAge)} años
                            </Typography>
                            {(user.province && user.city) && (
                                <>
                                    <Box sx={{ fontSize: '6px', padding: '0 8px' }}>
                                        <CircleIcon fontSize='inherit' color='primary' />
                                    </Box>
                                    <Typography color='info.main' sx={{ display: 'flex', alignItems: 'center' }}>
                                        <MapPin size={20} />
                                        {user.province},&nbsp;
                                        {user.city}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body1" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                            <Mail size={20} />
                            <Box marginRight='1rem' />
                            {user.email}
                        </Typography>
                        {user.phone && (
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                gutterBottom
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Box>
                                    <Phone size={20} />
                                </Box>
                                <Box marginRight='1rem' />
                                {user.code_phone}&nbsp;{user.phone}
                            </Typography>
                        )}
                    </Box>
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
