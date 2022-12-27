import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext'
import PhotoInput from '../../components/Forms/PhotoInput';
import { fileProvider, apiProvider } from '../../api'
import formDataHandler from '../../utils/formDataHandler';
import Avatar from '@mui/material/Avatar';
import getUserPhoto from '../../utils/getUserPhoto';
import useEffectOnce from '../../utils/useEffectOnce';

const getCurrDogPhoto = data => JSON.parse(data)[0]

const EditPhoto = ({ isEditing }) => {
    const { state: { user }, dispatch } = useAuth();
    const { handleSubmit, control, watch, formState: {
        isSubmitting
    }} = useForm();
    const dogPhoto = getCurrDogPhoto(user.dog.dogPhotos);

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
            console.log(error)
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
            console.log(error)
        }
    }

    useEffectOnce(() => {
        const subscription = watch(handleSubmit(onSubmit))

        return () => subscription.unsubscribe();
    }, [handleSubmit, watch])

    return (
        <Box sx={{ display: 'flex' }}>
            {isEditing ? (
                <PhotoInput
                    name="files"
                    control={control}
                    defaultValue={dogPhoto ? getUserPhoto(dogPhoto) : '/images/Avatar.svg'}
                    disabled={isSubmitting}
                    handleDelete={deletePhoto}
                />
            ) : (
                <Avatar
                    src={dogPhoto ? getUserPhoto(dogPhoto) : '/images/Avatar.svg'}
                    alt="profile_photo"
                    sx={{ height: '125px', width: '125px' }}
                />
            )}
        </Box>
    );
}

export default EditPhoto
