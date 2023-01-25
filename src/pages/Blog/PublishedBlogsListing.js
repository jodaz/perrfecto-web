import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import PostCard from './PostCard';
import useEffectOnce from '../../utils/useEffectOnce';
import SettingsLayout from '../../layouts/SettingsLayout';
import { SlidersHorizontal } from 'lucide-react';
import DeletePublication from '../../components/Modals/DeletePublication';
import SearchBox from '../../components/SearchBox';
import BlogFilterDrawer from '../../components/BlogFilterDrawer';
import { useBlogs, fetchBlogs } from '../../context/BlogContext';

const PublishedBlogsListing = () => {
    const [deletePost, setDeletePost] = React.useState(null)
    const { state: { items }, dispatch } = useBlogs()

    const handleDeletePost = async (post = null) => {
        setDeletePost(post ? post : null);
    }

    useEffectOnce(() => { fetchBlogs(dispatch) }, []);

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
            }} id="blog-drawer-container">
                <Box sx={{ margin: '10px 0' }}>
                    <SearchBox />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: '10px' }}>
                    {(items.length) ? (
                        <Stack
                            direction={'column'}
                            spacing={3}
                            sx={{
                                mt: 2
                            }}
                        >
                            {items.map(blog => (
                                <PostCard
                                    item={blog}
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
            </Box>
            <DeletePublication
                open={deletePost}
                handleClose={() => handleDeletePost(null)}
                item={deletePost}
                redirect='/blogs/me'
            />
            <BlogFilterDrawer />
        </SettingsLayout>
    );
}

export default PublishedBlogsListing
