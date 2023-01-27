import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinkBehavior from '../../components/LinkBehavior';
import {
    Flag,
    Star,
    Settings
} from 'lucide-react';
import CustomButton from './CustomButton';
import getSearchParams from '../../utils/getSearchParams';
import { useLocation, useNavigate } from 'react-router-dom';
import EllipseImage from '../../components/EllipseImage'
import { renewToken, useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form';
import PhotoInput from '../../components/Forms/PhotoInput';
import { fileProvider, apiProvider } from '../../api'
import formDataHandler from '../../utils/formDataHandler';

const RegisterOwner = React.lazy(() => import('../../components/RegisterOwner'));

const BusinessProfile = () => {
    const [error, setError] = React.useState('')
    const { state: { user }, dispatch } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const currProfilePic = user.img_profile ? JSON.parse(user.img_profile)[0] : null;
    const registerOwner = getSearchParams(location, 'register');
    const { handleSubmit, control, watch, formState: {
        isSubmitting
    }} = useForm();

    const onSubmit = async (data) => {
        try {
            const parsedData = {
                files: data.files,
                body: {
                    img_delete: user.img_profile ? user.img_profile : null
                }
            }

            const formData = await formDataHandler(parsedData, 'files')

            const res = await fileProvider.put('/api/user/img-profile', formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
            }
        } catch (error) {
            setError('Ha ocurrido un error inesperado.')
        }
    }

    const deletePhoto = async (picture) => {
        try {
            const res = await apiProvider.delete(`/api/user/img-profile/${picture}`)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
            }
        } catch (error) {
            setError('Ha ocurrido un error inesperado.')
        }
    }

    React.useEffect(() => {
        const subscription = watch(handleSubmit(onSubmit))

        return () => subscription.unsubscribe();
    }, [handleSubmit, watch])

    return (
        <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: theme => theme.palette.primary.main,
                borderBottomLeftRadius: '50px',
                borderBottomRightRadius: '50px',
                height: '280px',
                position: 'relative',
                paddingTop: '2rem'
            }}>
                <IconButton
                    component={LinkBehavior}
                    to='settings'
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '50px'
                    }}
                >
                    <Settings color="#fff" />
                </IconButton>
                <EllipseImage
                    sx={{
                        top: 0,
                        left: 0
                    }}
                    n='ProfileEllipse1'
                />
                <EllipseImage
                    sx={{
                        bottom: 0,
                        right: 0
                    }}
                    n='ProfileEllipse2'
                />
                <Typography
                    variant="h6"
                    fontWeight={900}
                    color="secondary"
                    mt={2}
                >
                    Mi perfil
                </Typography>
                <PhotoInput
                    name="files"
                    control={control}
                    defaultValue={currProfilePic}
                    disabled={isSubmitting}
                    handleDelete={() => deletePhoto(currProfilePic)}
                />
                <Box p={1}>
                    <Typography
                        variant="h6"
                        fontWeight={900}
                        color="secondary"
                    >
                        {user.name} {user.last_name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        fontWeight={500}
                        color="secondary"
                    >
                        {user.email}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                flex: 1,
                paddingTop: '4rem',
            }}>
                <CustomButton
                    size={32}
                    icon={<Star />}
                    title='Mi subscripción'
                    color="primary"
                    component={LinkBehavior}
                    to='subscription'
                />
            </Box>
        </Box>
    );
}

export default BusinessProfile
