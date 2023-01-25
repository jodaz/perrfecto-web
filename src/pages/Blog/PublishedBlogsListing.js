import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import PostCard from './PostCard';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce';
import LoadingIndicator from '../../components/LoadingIndicator';
import SettingsLayout from '../../layouts/SettingsLayout';
import { SlidersHorizontal } from 'lucide-react';
import DeletePublication from '../../components/Modals/DeletePublication';
import SearchBox from '../../components/SearchBox';

const MyBlogs = ({ blogs, handleDeletePost }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: '10px' }}>
        {(blogs.length) ? (
            <Stack
                direction={'column'}
                spacing={3}
                sx={{
                    mt: 2
                }}
            >
                {blogs.map(blog => (
                    <PostCard
                        {...blog}
                        handleDelete={() => handleDeletePost(blog)}
                        showMenu
                        showStatus
                    />
                ))}
            </Stack>
        ) : (
            <Typography variant="subtitle1">
                Aún no has publicado ningún blog
            </Typography>
        )}
    </Box>
);

const PublishedBlogsListing = () => {
    const [deletePost, setDeletePost] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [blogs, setBlogs] = React.useState([])

    const handleDeletePost = async (post = null) => {
        console.log(post)
        setDeletePost(post ? post : null);
    }

    const fetchBlogs = async () => {
        setLoading(true)

        try {
            const res = await apiProvider.get('api/blog/blog-by-uid')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data: { data } } } = res;

                setBlogs(data)
                setLoading(false)
            }
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }

    useEffectOnce(() => { fetchBlogs() }, []);

    return (
        <SettingsLayout
            title="Mis blogs"
            rightIconComponent={
                <IconButton>
                    <SlidersHorizontal />
                </IconButton>
            }
        >
            <Box sx={{
                p: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
            }}>
                <Box sx={{ margin: '10px 0' }}>
                    <SearchBox />
                </Box>
                {(loading)
                    ? <LoadingIndicator />
                    : <MyBlogs blogs={blogs} handleDeletePost={handleDeletePost} />
                }
            </Box>
            <DeletePublication
                open={deletePost}
                handleClose={() => handleDeletePost(null)}
                item={deletePost}
            />
        </SettingsLayout>
    );
}

export default PublishedBlogsListing
