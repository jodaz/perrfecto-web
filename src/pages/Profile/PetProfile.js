import * as React from 'react';
import Box from '@mui/material/Box';
import LinkBehavior from '../../components/LinkBehavior';
import {
    PlusSquare,
    Newspaper
} from 'lucide-react';
import CustomButton from './CustomButton';
import getSearchParams from '../../utils/getSearchParams';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicTabs from '../../components/Tabs';
import ProfileOptions from './ProfileOptions';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext'
import PhotoInput from '../../components/Forms/PhotoInput';
import { fileProvider, apiProvider } from '../../api'
import Photo from '../../components/Photo';
import formDataHandler from '../../utils/formDataHandler';
import MyAds from '../Ad/MyAds';

const RegisterDog = React.lazy(() => import('../../components/RegisterDog'));

const getCurrDogPhoto = data => JSON.parse(data)[0]

const PetProfile = () => {
    const [error, setError] = React.useState('')
    const { state: { user }, dispatch } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const registerDog = getSearchParams(location, 'dog');
    const { handleSubmit, control, watch } = useForm();

    const onSubmit = async (data) => {
        try {
            const parsedData = {
                files: data.files,
                body: {
                    img_delete: user.img_profile ? user.img_profile : null
                }
            }

            const formData = await formDataHandler(parsedData, 'files')

            const res = await fileProvider.put(`/api/dog/img-dog/${user.dog.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
            }
        } catch (error) {
            setError('Ha ocurrido un error inesperado.')
        }
    }

    const deletePhoto = async () => {
        try {
            const dogPhoto = await getCurrDogPhoto(user.dog.dogPhotos)
            const res = await apiProvider.delete(`/api/dog/img-dog/${user.dog.id}/${dogPhoto}`)

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
        <>
            <Box sx={{ pt: 1, width: '100%', textAlign: 'center', backgroundColor: '#f6f6f6' }}>
                <BasicTabs />
                <Box sx={{
                    marginTop: '1rem',
                }}>
                    <ProfileOptions />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flex: 1,
                        p: 2
                    }}>
                        {(user.dog) && (
                            <PhotoInput
                                name="files"
                                control={control}
                                defaultValue={(user.dog) && getCurrDogPhoto(user.dog.dogPhotos)}
                                handleDelete={deletePhoto}
                            />
                        )}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flex: 1,
                        paddingTop: '4rem',
                        width: 'fit-content',
                        margin: '0 auto'
                    }}>
                        <CustomButton
                            size={32}
                            icon={<Newspaper />}
                            title='Crear publicación'
                            color="primary"
                        />
                        <CustomButton
                            size={32}
                            icon={<PlusSquare />}
                            title='Crear anuncio'
                            color="info"
                            component={LinkBehavior}
                            to={(user.dog) ? '/profile/ads/create' : '?dog=true'}
                        />
                    </Box>
                    {(registerDog) && (
                        <React.Suspense>
                            <RegisterDog
                                open={registerDog}
                                handleClose={() => navigate('/profile')}
                                redirect='/profile/ads/create'
                            />
                        </React.Suspense>
                    )}
                </Box>
            </Box>
            {!!(user.publication?.length) && <MyAds {...user} />}
        </>
    );
}

export default PetProfile
