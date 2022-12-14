import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import LinkBehavior from '../../components/LinkBehavior';
import getSearchParams from '../../utils/getSearchParams';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext'
import useMediaQuery from '@mui/material/useMediaQuery';
import TextInput from '../../components/Forms/TextInput';
import CreateAdLocation from './CreateAdLocation';
import AddCertificates from '../certificates/AddCertificates';

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

    // <Box sx={{ p: 2 }}>
    //                 <Typography
    //                     variant="body2"
    //                     fontWeight={500}
    //                     color="text.secondary"
    //                     textTransform='uppercase'
    //                 >
    //                     Información de la mascota
    //                 </Typography>
    //                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                     <Box sx={{
    //                         display: 'flex',
    //                         justifyContent: 'space-around',
    //                     }}>
    //                         {/** Raza */}
    //                         <Typography color="primary.main">
    //                             {dog.breed}
    //                         </Typography>
    //                         <Box
    //                             sx={{
    //                                 color: theme => theme.palette.primary.main
    //                             }}
    //                         >.</Box>
    //                         {/** Edad */}
    //                         <Typography color="primary.main">
    //                             3 años
    //                         </Typography>
    //                         <Box
    //                             sx={{
    //                                 color: theme => theme.palette.primary.main
    //                             }}
    //                         >.</Box>
    //                         {/** Ubicación */}
    //                         <Typography
    //                             color="info.main"
    //                             sx={{ display: 'flex', alignItems: 'center' }}
    //                         >
    //                             <MapPin size={20} />
    //                             Sevilla, España
    //                         </Typography>
    //                     </Box>
    //                 </Box>
    //                 <Box sx={{ pt: 2, color: 'black' }}>
    //                     <TextInput
    //                         name='description'
    //                         control={control}
    //                         label='Descripción:'
    //                         placeholder='Escribir aquí'
    //                         sx={{
    //                             border: 'none !important',
    //                             padding: 0,
    //                             '&.Mui-focused': {
    //                                 boxShadow: 'none',
    //                                 borderColor: 'none'
    //                             },
    //                         }}
    //                     />
    //                 </Box>
    //             </Box>

    return (
        // <SettingsLayout title={tab ? 'Ubicación' : 'Crear anuncio'}>
        <SettingsLayout title='Crear anuncio'>
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <CreateAdLocation control={control} />
                <AddCertificates control={control} />
            </Box>
        </SettingsLayout>
    );
}

export default CreateAd
