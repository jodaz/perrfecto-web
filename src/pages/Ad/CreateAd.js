import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext'
import useMediaQuery from '@mui/material/useMediaQuery';
import TextInput from '../../components/Forms/TextInput';
import { apiProvider, fileProvider } from '../../api';
import AdPhotoInput from '../../components/AdPhotoInput';
import InterestInput from '../../components/InterestInput';
import formDataHandler from '../../utils/formDataHandler';

const CreateAd = () => {
    const [interests, setInterests] = React.useState([])
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const { state: { user } } = useAuth();
    const { dog } = user
    const insterestsValues = watch('interests')

    const onSubmit = async (data) => {
        const formData = await formDataHandler(data, 'files')

        try {
            const res = await fileProvider.post('/api/publication/new', formData)

            if (res.status >= 200 && res.status < 300) {
                console.log("exito")
            }
        } catch (error) {
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

    React.useEffect(() => { fetchInterests() }, []);

    return (
        <SettingsLayout title='Crear anuncio' id="drawer-container">
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
                        >
                            información de la mascota
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}>
                            {/** Raza */}
                            <Typography color="primary.main">
                                {dog.breed}
                            </Typography>
                            <Box
                                sx={{
                                    color: theme => theme.palette.primary.main
                                }}
                            >.</Box>
                            {/** Edad */}
                            <Typography color="primary.main">
                                3 años
                            </Typography>
                            <Box
                                sx={{
                                    color: theme => theme.palette.primary.main
                                }}
                            >.</Box>
                            {/** Ubicación */}
                            <Typography
                                color="info.main"
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <MapPin size={20} />
                                Sevilla, España
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ pt: 2, pb: 2 }}>
                        <InterestInput
                            control={control}
                            options={interests}
                            currentValues={insterestsValues}
                            isSubmitting={isSubmitting}
                        />
                    </Box>
                    <Box sx={{ pt: 2, color: 'black' }}>
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
                    <Box sx={{ display: 'flex', }}>
                        <Typography
                            variant="body2"
                            color="text.tertiary"
                            textTransform={'uppercase'}
                        >
                            Permisos
                        </Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button variant="contained" type="submit" fullWidth>
                            Enviar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default CreateAd
