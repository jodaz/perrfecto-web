import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext'
import useMediaQuery from '@mui/material/useMediaQuery';
import TextInput from '../../components/Forms/TextInput';
import { IconButton } from '@mui/material';
import AdPhotoInput from '../../components/AdPhotoInput';

const CreateAd = ({ location }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()
    // const tab = getSearchParams(location, 'location');
    const [errorAlert, setErrorAlert] = React.useState('')
    const { control, handleSubmit, setError, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const { state: { user } } = useAuth();
    const { dog } = user

    const onSubmit = async (data) => {
        setErrorAlert('');
        // try {
        //     const res = await apiProvider.post('/api/auth', {
        //         ...data
        //     })

        //     if (res.status >= 200 && res.status < 300) {
        //         const { data } = res;
        //         loginUser(dispatch, data)

        //         if (data.data.role == 'user') {
        //             navigate('/detect-location')
        //         } else {
        //             navigate('/home')
        //         }
        //     }
        // } catch (error) {
        //     if (error.response.data.msg) {
        //         const message = error.response.data.msg;

        //         if (message.includes('The user does not exist with that email')) {
        //             setErrorAlert('No estás registrado. Crea una cuenta para poder comenzar en TinderDogs.')
        //         }
        //         if (message.includes('The user does not exist with that phone')) {
        //             setErrorAlert('No estás registrado. Crea una cuenta para poder comenzar en TinderDogs.')
        //         }
        //         if (message.includes('Wrong Password')) {
        //             setError('password', {
        //                 type: 'invalid'
        //             })
        //         }
        //     }
        // }
    };

    return (
        <SettingsLayout title='Crear anuncio'>
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <AdPhotoInput />
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
