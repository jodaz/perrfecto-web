import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Menu from '../../components/Menu';
import IconButton from '@mui/material/IconButton';
import { Trash2, ChevronLeft, Edit, MoreVertical } from 'lucide-react'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import BlogEdit from './BlogEdit';
import DeletePublication from '../../components/Modals/DeletePublication';

const PublishedBlog = ({ closePost, ...restData }) => {
    const {
        image,
        title,
        description,
        lastName,
        name,
        img_profile,
        published_at
    } = restData
    const [deletePost, setDeletePost] = React.useState(false)
    const [editPost, setEditPost] = React.useState(false)

    const handleDeletePost = async () => {
        setDeletePost(!deletePost);
    }

    const handleEditPost = async () => {
        setEditPost(!editPost);
    }

    if (editPost) {
        return (
            <BlogEdit
                goBack={handleEditPost}
                {...restData}
            />
        )
    }

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '100%',
                width: '100%'
            }}>
                <Box sx={{
                    flex: 1,
                    height: 'fit-content',
                    width: '100%',
                    position: 'relative'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        zIndex: 100,
                        bgcolor: 'rgba(0, 0, 0, 0.36)',
                        borderRadius: '100px',
                        left: 20,
                        top: 20
                    }}>
                        <IconButton onClick={closePost}>
                            <ChevronLeft color="#fff" />
                        </IconButton>
                    </Box>
                    <Box
                        component="img"
                        width="100%"
                        height="350px"
                        alt='blog_post.png'
                        src={image}
                    />
                </Box>
                <Box sx={{
                    borderRadius: '24px 24px 0px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    position: 'relative'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        zIndex: 100,
                        bgcolor: 'rgba(0, 0, 0, 0.36)',
                        borderRadius: '100px',
                        right: 20,
                        top: 20
                    }}>
                        <Menu
                            icon={<MoreVertical />}
                            IconButtonProps={{
                                sx: {
                                    backgroundColor: '#fff',
                                    border: 'none',
                                    color: 'none'
                                }
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                textDecoration: 'none',
                                color: 'unset',
                                alignItems: 'center'
                            }} onClick={handleEditPost}>
                                <Edit />
                                <Box sx={{ paddingLeft: '0.5rem' }}>
                                    Editar blog
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }} onClick={handleDeletePost}>
                                <Trash2 />
                                <Box sx={{ paddingLeft: '0.5rem' }}>
                                    Eliminar blog
                                </Box>
                            </Box>
                        </Menu>
                    </Box>
                    <Stack
                        orientation='vertical'
                        spacing={1}
                        sx={{ p: 2 }}
                    >
                        <Typography
                            component="div"
                            variant="body2"
                            color="text.tertiary"
                            fontWeight={500}
                            sx={{ textTransform: 'capitalize' }}
                        >
                            {format(published_at, 'MMMM d, y', { locale: es })}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'start', flex: 1 }}>
                            <Box
                                component="img"
                                alt='blog_post.png'
                                src={img_profile}
                                sx={{
                                    maxWidth: 22,
                                    maxHeight: 22,
                                    borderRadius: 1,
                                    mr: 1
                                }}
                            />
                            <Typography
                                component="div"
                                variant="caption"
                                color="text.secondary"
                                fontWeight={500}
                            >
                                {`${name} ${lastName}`}
                            </Typography>
                        </Box>
                        <Typography
                            variant="h5"
                            color="text.primary"
                            fontWeight={500}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                        >
                            {description}
                        </Typography>
                    </Stack>
                    <DeletePublication
                        open={deletePost}
                        handleClose={handleDeletePost}
                        item={restData}
                    />
                </Box>
            </Box>
        </Slide>
    )
}

export default PublishedBlog
