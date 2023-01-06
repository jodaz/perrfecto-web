import * as React from 'react';
import Box from '@mui/material/Box';
import LinkBehavior from '../../components/LinkBehavior';
import {
    PlusSquare,
    Newspaper,
    Image
} from 'lucide-react';
import CustomButton from './CustomButton';
import getSearchParams from '../../utils/getSearchParams';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicTabs from '../../components/Tabs';
import ProfileOptions from './ProfileOptions';
import { renewToken, useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form';
import PhotoInput from '../../components/Forms/PhotoInput';
import { fileProvider, apiProvider } from '../../api'
import formDataHandler from '../../utils/formDataHandler';

const RegisterOwner = React.lazy(() => import('../../components/RegisterOwner'));

const PetOwner = () => {
    const [error, setError] = React.useState('')
    const { state: { user }, dispatch } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
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

    const deletePhoto = async () => {
        try {
            const res = await apiProvider.delete(`/api/user/img-profile/${user.img_profile}`)

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
        <Box sx={{ p: 1, textAlign: 'center', backgroundColor: '#f6f6f6', width: '100%' }}>
            <BasicTabs />
            <Box sx={{
                marginTop: '1rem',
                width: '100%'
            }}>
                <ProfileOptions />
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flex: 1,
                    p: 2
                }}>
                    <PhotoInput
                        name="files"
                        control={control}
                        defaultValue={user.img_profile}
                        disabled={isSubmitting}
                        handleDelete={deletePhoto}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flex: 1,
                    paddingTop: '4rem',
                }}>
                    <CustomButton
                        size={32}
                        icon={<Image />}
                        title='Subir fotos personales'
                        sx={{
                            background: 'linear-gradient(122.24deg, #F2D862 6.2%, #EBA046 69.82%);'
                        }}
                        component={LinkBehavior}
                        to='pictures'
                    />
                    <CustomButton
                        size={32}
                        icon={<Newspaper />}
                        title='Crear publicación'
                        color="primary"
                    />
                    {!(!user.date_birth || !user.img_profile || !user.province) && (
                        <CustomButton
                            size={32}
                            icon={<PlusSquare />}
                            title='Añadir información'
                            color="info"
                            component={LinkBehavior}
                            to='?register=true'
                        />
                    )}
                </Box>
                {!(user.date_birth) && (
                    <React.Suspense>
                        <RegisterOwner
                            open={registerOwner}
                            handleClose={() => navigate('/profile/owner')}
                            redirect='/profile/owner'
                        />
                    </React.Suspense>
                )}
            </Box>
        </Box>
    );
}

export default PetOwner
