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

const BlogEditLayout = ({
    BlogMultimedia,
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
    const [deletePost, setDeletePost] = React.useState(false)
    const [openWarning, setOpenWarning] = React.useState(false)
    const [openOverlayLoader, setOpenOverlayLoader] = React.useState(false)

    const onSubmit = data => {
        setOpenOverlayLoader(true)

        setTimeout(() => {
            setOpenWarning(true)
            setOpenOverlayLoader(false)
        }, 3000)
    }

    const handleCloseWarning = () => {
        setOpenWarning(false);
    }

    const handleDeletePost = async () => {
        setDeletePost(!deletePost);
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

    return <BlogEditLayout {...blog} />;
}

export default BlogEdit;
