import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '../../components/Button'
import Typography from '@mui/material/Typography';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { fileProvider, apiProvider } from '../../api'
import { ADD_PHOTOS } from '../../validations';
import useEffectOnce from '../../utils/useEffectOnce';
import GalleryInput from '../../components/GalleryInput'
import DeletePhotoWarning from '../../components/Modals/DeletePhotoWarning';
import formDataHandler from '../../utils/formDataHandler';
import PicturesEdited from '../../components/Modals/PicturesEdited';

const EditOwnerProfilePictures = () => {
    const [openWarning, setOpenWarning] = React.useState(false)
    const [pictures, setPictures] = React.useState([])
    const [error, setError] = React.useState(null);
    const [selectedPhoto, setSelectedPhoto] = React.useState(null)
    const [openDeletePhoto, setOpenDeletePhoto] = React.useState(false);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { isSubmitting }
    } = useForm({
        defaultValues: {
            files: pictures
        }
    });

    const onSubmit = async ({ files }) => {
        try {
            let filteredFiles = []

            if (files.length) {
                filteredFiles = files.filter(file => typeof(file) != 'string')
            }

            const parsedData = {
                files: filteredFiles
            }

            const formData = await formDataHandler(parsedData, 'files')

            const res = await fileProvider.put(`/api/user/personal-photos`, formData)

            if (res.status >= 200 && res.status < 300) {
                const responseData = JSON.parse(await res.data.text())

                const { data: { personalPhotos } } = responseData

                setPictures(prevState => [...personalPhotos, ...prevState])
                setOpenWarning(true)
            }
        } catch (error) {
            setError('Ha ocurrido un error inesperado.')
        }
    }

    const fetchPictures = async () => {
        try {
            const res = await apiProvider.get('api/user/personal-photos')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                if (data) setPictures(data)
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const handleOpenDeletePhoto = (file) => {
        setOpenDeletePhoto(true);
        setSelectedPhoto(file)
    }

    const handleCloseDeletePhoto = () => {
        setOpenDeletePhoto(false)
        setSelectedPhoto(null)
    }

    useEffectOnce(() => { fetchPictures() }, [])

    React.useEffect(() => { setValue('files', pictures) }, [pictures])

    return (
        <SettingsLayout title='Fotos personales'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Typography textAlign="center" color="text.tertiary" sx={{ p: 2 }}>
                        Estas fotos serán visibles para todos los usuarios.
                    </Typography>
                    <Box sx={{ p: 2 }}>
                        <GalleryInput
                            control={control}
                            name='files'
                            disabled={isSubmitting}
                            rules={ADD_PHOTOS.rules}
                            validations={ADD_PHOTOS.messages}
                            deletePhotoHandler={handleOpenDeletePhoto}
                            accept={{
                                'image/*': []
                            }}
                            maxFiles={3}
                            message='Tienes un máximo de 3 fotos'
                        />
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        Guardar
                    </Button>
                </Box>
                <PicturesEdited
                    open={openWarning}
                    handleClose={() => setOpenWarning(false)}
                />
                <DeletePhotoWarning
                    open={openDeletePhoto}
                    handleClose={handleCloseDeletePhoto}
                    file={selectedPhoto}
                    endpoint={`api/user/personal-photos`}
                    sideAction={() => fetchPictures()}
                />
            </Box>
        </SettingsLayout>
    );
}

export default EditOwnerProfilePictures
