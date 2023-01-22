import * as React from 'react'
import SettingsLayout from "../../layouts/SettingsLayout";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import GalleryInput from '../../components/GalleryInput'
import { useParams, useNavigate } from 'react-router-dom';
import TextInput from "../../components/Forms/TextInput";
import { apiProvider, fileProvider } from '../../api';
import {
    DESCRIPTION,
    ADD_PHOTOS,
    NAME
} from '../../validations'
import PublicationWait from '../../components/Modals/PublicationWait';
import OverlayLoader from '../../components/Modals/OverlayLoader';
import { useAuth } from '../../context/AuthContext';
import useEffectOnce from '../../utils/useEffectOnce';
import LoadingIndicator from '../../components/LoadingIndicator';
import DeletePhotoWarning from '../../components/Modals/DeletePhotoWarning';
import formDataHandler from '../../utils/formDataHandler';

const BlogEditLayout = ({
    id,
    BlogMultimedia,
    currAuthUser,
    sideAction,
    ...restData
}) => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue
    } = useForm({
        defaultValues: restData
    });
    const [openDeletePhoto, setOpenDeletePhoto] = React.useState(false);
    const [selectedPhoto, setSelectedPhoto] = React.useState(null)
    const [openWarning, setOpenWarning] = React.useState(false)
    const [openOverlayLoader, setOpenOverlayLoader] = React.useState(false)

    const onSubmit = async (values) => {
        let filteredFiles = []
        setOpenOverlayLoader(true)

        try {
            const {
                files,
                ...restValues
            } = values

            if (files.length) {
                filteredFiles = files.filter(file => typeof(file) != 'string')
            }

            const data = {
                ...restValues,
                files: filteredFiles,
            }

            const formData = await formDataHandler(data, 'files')

            const res = await fileProvider.put(`/api/blog/update-blog/${id}`, formData)

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

    const handleOpenDeletePhoto = fileName => {
        const file = BlogMultimedia.find(({ name }) => name == fileName)

        setOpenDeletePhoto(true);
        setSelectedPhoto(file)
    }

    const handleCloseDeletePhoto = () => {
        setOpenDeletePhoto(false)
        setSelectedPhoto(null)
    }

    React.useEffect(() => {
        setValue("files", BlogMultimedia.map(item => item.name))
    }, [BlogMultimedia.length])

    return (
        <SettingsLayout title="Editar publicación">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }} component='form' onSubmit={handleSubmit(onSubmit)}>
                <Box p={2}>
                    <GalleryInput
                        control={control}
                        name='files'
                        disabled={isSubmitting}
                        rules={ADD_PHOTOS.rules}
                        deletePhotoHandler={handleOpenDeletePhoto}
                        validations={ADD_PHOTOS.messages}
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
                        Guardar cambios
                    </Button>
                </Box>
                <PublicationWait
                    open={openWarning}
                    handleClose={handleCloseWarning}
                />
                <OverlayLoader
                    open={openOverlayLoader}
                />
                {(selectedPhoto) && (
                    <DeletePhotoWarning
                        open={openDeletePhoto}
                        handleClose={handleCloseDeletePhoto}
                        file={selectedPhoto.id}
                        endpoint={`/api/blog/file`}
                        sideAction={sideAction}
                    />
                )}
            </Box>
        </SettingsLayout>
    )
}

const BlogEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true)
    const [blog, setBlog] = React.useState(null)
    const { state: { user } } = useAuth()

    const fetchBlog = async () => {
        setLoading(true)

        try {
            const res = await apiProvider.get(`api/blog/blog/${id}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                if (user.email == data.User.email) {
                    setBlog(data)
                    setLoading(false)
                } else {
                    navigate(-1);
                }
            }
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }

    useEffectOnce(() => { fetchBlog() }, []);

    if (loading) return <LoadingIndicator />

    return (
        <BlogEditLayout
            {...blog}
            currAuthUser={user}
            sideAction={fetchBlog}
        />
    );
}

export default BlogEdit;
