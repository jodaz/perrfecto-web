import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext'
import PhotoInput from '../../components/Forms/PhotoInput';
import { fileProvider, apiProvider } from '../../api'
import formDataHandler from '../../utils/formDataHandler';
import Avatar from '@mui/material/Avatar';
import getUserPhoto from '../../utils/getUserPhoto';

const EditPhoto = ({ isEditing, toggleEdit }) => {
    const { state: { user }, dispatch } = useAuth();
    const [currProfilePic, setCurrProfilePic] = React.useState(null);
    const { handleSubmit, control, watch, formState: {
        isSubmitting, isSubmitSuccessful
    }} = useForm();

    const onSubmit = async (values) => {
        try {
            const formData = await formDataHandler(values, 'files')

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
            const res = await apiProvider.delete(`/api/user/img-profile/${currProfilePic}`)

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

    React.useEffect(() => {
        if (user.img_profile) {
            setCurrProfilePic(JSON.parse(user.img_profile)[0])
        }
    }, [user.img_profile])

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            toggleEdit()
        }
     }, [isSubmitSuccessful])

    return (
        <Box sx={{ display: 'flex' }}>
            {isEditing ? (
                <PhotoInput
                    name="files"
                    control={control}
                    defaultValue={currProfilePic}
                    disabled={isSubmitting}
                    handleDelete={deletePhoto}
                />
            ) : (
                <Avatar
                    src={currProfilePic ? getUserPhoto(currProfilePic) : '/images/Avatar.svg'}
                    alt="profile_photo"
                    sx={{ height: '125px', width: '125px' }}
                />
            )}
        </Box>
    );
}

export default EditPhoto
