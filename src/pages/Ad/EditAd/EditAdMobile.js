import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsLayout from '../../../layouts/SettingsLayout';
import { useForm } from "react-hook-form";
import { useAuth, renewToken } from '../../../context/AuthContext'
import TextInput from '../../../components/Forms/TextInput';
import SwitchInput from '../../../components/Forms/SwitchInput';
import { apiProvider, fileProvider } from '../../../api';
import GalleryInput from '../../../components/GalleryInput';
import InterestInput from '../../../components/InterestInput';
import formDataHandler from '../../../utils/formDataHandler';
import PublicationWait from '../../../components/Modals/PublicationWait';
import OverlayLoader from '../../../components/Modals/OverlayLoader';
import useEffectOnce from '../../../utils/useEffectOnce'
import DeletePhotoWarning from '../../../components/Modals/DeletePhotoWarning';
import DogInformation from '../DogInformation';
import { DESCRIPTION, ADD_PHOTOS } from '../../../validations';

const selectedItems = labels => labels.map(({ id }) => id)

const SwitchInputContainer = ({
    control,
    label,
    name
}) => (
    <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 1
    }}>
        <Typography variant="subtitle1" color="text.secondary">
            {label}
        </Typography>
        <SwitchInput
            control={control}
            name={name}
        />
    </Box>
)

const EditAdMobile = () => {
    const { state: { user }, dispatch } = useAuth();
    const [openWarning, setOpenWarning] = React.useState(false)
    const [openDeletePhoto, setOpenDeletePhoto] = React.useState(false);
    const [selectedPhoto, setSelectedPhoto] = React.useState(null)
    const [openOverlayLoader, setOpenOverlayLoader] = React.useState(false)
    const [interests, setInterests] = React.useState([])
    const { control, handleSubmit, watch, setValue, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            interests: user.publication.interests ? selectedItems(user.publication.interests) : null,
            description: user.publication.description,
            permission_geolocation: user.publication.permission_geolocation,
            permission_whatsapp: user.publication.permission_whatsapp,
            permission_tlf: user.publication.permission_tlf
        }
    });
    const insterestsValues = watch('interests')

    const onSubmit = async (data) => {
        let filteredFiles = []
        const { files, ...rest } = data;

        if (files.length) {
            filteredFiles = files.filter(file => typeof(file) != 'string')
        }

        const parsedData = {
            ...rest,
            files: filteredFiles
        }

        setOpenOverlayLoader(true)
        const formData = await formDataHandler(parsedData, 'files')

        try {
            const res = await fileProvider.put(`/api/publication/edit/${user.publication.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
                setOpenWarning(true)
                setOpenOverlayLoader(false)
            }
        } catch (error) {
            setOpenOverlayLoader(false)
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

    useEffectOnce(() => { fetchInterests() }, []);

    const handleCloseWarning = () => {
        setOpenWarning(false);
    }

    const handleOpenDeletePhoto = (file) => {
        setOpenDeletePhoto(true);
        setSelectedPhoto(file)
    }

    const handleCloseDeletePhoto = () => {
        setOpenDeletePhoto(false)
        setSelectedPhoto(null)
    }

    React.useEffect(() => {
        console.log(JSON.parse(user.publication.multimedia))
        setValue("files", JSON.parse(user.publication.multimedia))
    }, [user.publication.multimedia.length])

    return (
        <SettingsLayout title='Editar anuncio'>
            <Box id="interests-drawer-container" sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ p: 2 }}>
                    <GalleryInput
                        control={control}
                        name='files'
                        rules={ADD_PHOTOS.rules}
                        validations={ADD_PHOTOS.messages}
                        deletePhotoHandler={handleOpenDeletePhoto}
                        accept={{
                            'image/*': [],
                            'video/mp4': []
                        }}
                        maxFiles={15}
                        message='Tienes un máximo de 15 fotos'
                    />
                </Box>
                <Box sx={{ p: 2 }}>
                    <DogInformation />
                    <Box sx={{ pt: 2, pb: 2 }}>
                        <InterestInput
                            control={control}
                            options={interests}
                            currentValues={insterestsValues}
                            isSubmitting={isSubmitting}
                        />
                    </Box>
                    <Box sx={{ pt: 2, pb: 2, color: 'black' }}>
                        <TextInput
                            name='description'
                            control={control}
                            label='Descripción:'
                            placeholder='Escribir aquí'
                            multiline
                            maxRows={4}
                            rows={4}
                            rules={DESCRIPTION.rules}
                            validations={DESCRIPTION.messages}
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
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.tertiary"
                            textTransform='uppercase'
                            gutterBottom
                        >
                            Permisos
                        </Typography>
                        <SwitchInputContainer
                            label='Visualizar número de teléfono'
                            control={control}
                            name='permission_tlf'
                        />
                        <SwitchInputContainer
                            label='Activar geolocalización'
                            control={control}
                            name='permission_geolocation'
                        />
                        <SwitchInputContainer
                            label='Habilitar Whatsapp'
                            control={control}
                            name='permission_whatsapp'
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button variant="contained" type="submit" fullWidth>
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </Box>
            <PublicationWait open={openWarning} handleClose={handleCloseWarning} />
            <OverlayLoader open={openOverlayLoader} />
            <DeletePhotoWarning
                open={openDeletePhoto}
                handleClose={handleCloseDeletePhoto}
                file={selectedPhoto}
                endpoint={`api/publication/img_posted/${user.publication.id}`}
                sideAction={() => renewToken(dispatch, user)}
            />
        </SettingsLayout>
    );
}

export default EditAdMobile
