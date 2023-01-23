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
import DeletePublication from '../../components/Modals/DeletePublication';
import { useAuth } from '../../context/AuthContext';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useNavigate, useParams } from 'react-router-dom';
import getUserPhoto from '../../utils/getUserPhoto';
import { ThumbsUp, MessageSquare } from 'lucide-react';

const PublishedBlogLayout = ({
    title,
    BlogMultimedia,
    createdAt,
    description,
    currAuthUser,
    handleDeletePost,
    User,
    CommentsCount = 0,
    LikesCount = 0,
    navigate
}) => (
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
                    <IconButton onClick={() => navigate(-1)}>
                        <ChevronLeft color="#fff" />
                    </IconButton>
                </Box>
                <Box
                    component="img"
                    width="100%"
                    height="350px"
                    alt='blog_post.png'
                    src={BlogMultimedia.length ? getUserPhoto(BlogMultimedia[0].name) : null}
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
                {(User.email == currAuthUser.email) && (
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
                            }} onClick={() => navigate(`edit`)}>
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
                )}
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
                        {format(new Date(createdAt), 'MMMM d, y', { locale: es })}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'start', flex: 1 }}>
                        <Box
                            component="img"
                            alt='blog_post.png'
                            src={getUserPhoto(User.img_profile)}
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
                            {`${User.name} ${User?.lastName}`}
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
                <Stack
                    direction="row"
                    spacing={1}
                    p={2}
                    sx={{
                        justifyContent: { xs: 'space-between', sm: 'flex-start' },
                        alignItems: 'center'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThumbsUp color="#5E5E5E" />
                        <Typography variant="body2" ml={1} color="#5E5E5E">
                            {LikesCount}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MessageSquare color="#5E5E5E" />
                        <Typography variant="body2" ml={1} color="#5E5E5E">
                            {CommentsCount}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    </Slide>
)

const PublishedBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true)
    const [blog, setBlog] = React.useState([])
    const [deletePost, setDeletePost] = React.useState(false)
    const { state: { user } } = useAuth()

    const fetchBlog = async () => {
        setLoading(true)

        try {
            const res = await apiProvider.get(`api/blog/blog/${id}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setBlog(data)
                setLoading(false)
            }
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }

    const handleDeletePost = async () => {
        setDeletePost(!deletePost);
    }

    useEffectOnce(() => { fetchBlog() }, []);

    if (loading) return <LoadingIndicator />

    return (
        <>
            <PublishedBlogLayout
                {...blog}
                handleDeletePost={handleDeletePost}
                currAuthUser={user}
                navigate={navigate}
            />
            <DeletePublication
                open={deletePost}
                handleClose={handleDeletePost}
                item={blog}
            />
        </>
    )
}

export default PublishedBlog
