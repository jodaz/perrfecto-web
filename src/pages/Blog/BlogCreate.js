import * as React from 'react'
import SettingsLayout from "../../layouts/SettingsLayout";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import GalleryInput from '../../components/GalleryInput'
import { fileProvider } from '../../api';
import TextInput from "../../components/Forms/TextInput";
import Tooltip from '@mui/material/Tooltip';
import { Info } from 'lucide-react';
import {
    DESCRIPTION,
    ADD_PHOTOS,
    NAME
} from '../../validations'
import PublicationWait from '../../components/Modals/PublicationWait';
import OverlayLoader from '../../components/Modals/OverlayLoader';
import formDataHandler from '../../utils/formDataHandler';

const BlogCreate = () => {
    const [openWarning, setOpenWarning] = React.useState(false)
    const [openOverlayLoader, setOpenOverlayLoader] = React.useState(false)
    const { control, handleSubmit, formState: { isSubmitting } } = useForm();

    const onSubmit = async data => {
        setOpenOverlayLoader(true)

        const formData = await formDataHandler(data, 'files')

        try {
            const res = await fileProvider.post('/api/blog/new', formData)

            if (res.status >= 200 && res.status < 300) {
                setOpenWarning(true)
                setOpenOverlayLoader(false)
            }
        } catch (error) {
            setOpenOverlayLoader(false)
            console.log(error)
        }
    }

    const handleCloseWarning = () => {
        setOpenWarning(false);
    }

    return (
        <SettingsLayout
            title="Crear publicación"
            rightIconComponent={
                <Tooltip
                    title='Recuerda que puedes añadir imágenes de 800px por 800px de mínimo y 1080px por 1080px de máximo'
                >
                    <Box p={2} color="text.tertiary">
                        <Info />
                    </Box>
                </Tooltip>
            }
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto'
            }} component='form' onSubmit={handleSubmit(onSubmit)}>
                <Box p={2}>
                    <GalleryInput
                        control={control}
                        name='files'
                        disabled={isSubmitting}
                        rules={ADD_PHOTOS.rules}
                        validations={ADD_PHOTOS.messages}
                        maxFiles={5}
                        message='Tienes un máximo de 5 fotos disponibles'
                    />
                </Box>
                <Box p={2}>
                    <TextInput
                        control={control}
                        name='title'
                        disabled={isSubmitting}
                        rules={NAME.rules}
                        validations={NAME.messages}
                        label='Título'
                    />
                </Box>
                <Box p={2}>
                    <TextInput
                        control={control}
                        name='description'
                        disabled={isSubmitting}
                        label='Descripción'
                        rules={DESCRIPTION.rules}
                        validations={DESCRIPTION.messages}
                        multiline
                        maxRows={4}
                        rows={4}
                        sx={{
                            borderRadius: '16px !important',
                        }}
                    />
                </Box>
                <Box p={2}>
                    <Button type="submit" variant="contained">
                        Publicar
                    </Button>
                </Box>
            </Box>
            <PublicationWait
                open={openWarning}
                handleClose={handleCloseWarning}
                redirect="/blogs/me"
            />
            <OverlayLoader open={openOverlayLoader} />
        </SettingsLayout>
    );
}

export default BlogCreate;
