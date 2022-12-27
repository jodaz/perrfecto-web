import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext'
import PhotoInput from '../../components/Forms/PhotoInput';
import { fileProvider, apiProvider } from '../../api'
import formDataHandler from '../../utils/formDataHandler';
import Avatar from '@mui/material/Avatar';
import getUserPhoto from '../../utils/getUserPhoto';

const EditPhoto = ({ isEditing }) => {
    const { state: { user }, dispatch } = useAuth();
    const { handleSubmit, control, watch, formState: {
        isSubmitting
    }} = useForm();
    console.log(user.dog)

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
            console.log(error)
        }
    }

    const deletePhoto = async () => {
        try {
            const res = await apiProvider.delete(`/api/user/img-profile/${user.img_profile}`)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        const subscription = watch(handleSubmit(onSubmit))

        return () => subscription.unsubscribe();
    }, [handleSubmit, watch])

    return (
        <Box sx={{ display: 'flex' }}>
            {isEditing ? (
                <PhotoInput
                    name="files"
                    control={control}
                    defaultValue={user.img_profile}
                    disabled={isSubmitting}
                    handleDelete={deletePhoto}
                />
            ) : (
                <Avatar
                    src={`${getUserPhoto(user.img_profile)}`}
                    alt="profile_photo"
                    sx={{ height: '125px', width: '125px' }}
                />
            )}
        </Box>
    );
}

export default EditPhoto
