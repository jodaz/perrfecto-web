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
import { useBlogs, fetchBlogs, toggleFilters, searchBlogs } from '../../context/BlogContext';
import PostMenu from './PostMenu'
import FeaturePost from '../../components/Modals/FeaturePost';

const PublishedBlogsListing = () => {
    const [featurePost, setFeaturePost] = React.useState(null)
    const [deletePost, setDeletePost] = React.useState(null)
    const { state: { items }, dispatch } = useBlogs()

    const handleDeletePost = (post = null) => setDeletePost(post ? post : null)

    const toggleFeaturePost = (post = null) => setFeaturePost(post ? post : null)

    useEffectOnce(() => { fetchBlogs(dispatch) }, []);

    return (
        <SettingsLayout
            title="Mis blogs"
            rightIconComponent={
                <IconButton onClick={() => toggleFilters(dispatch)}>
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
                    <SearchBox filter={(data) => searchBlogs(dispatch, data)} />
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
                                    showStatus
                                    menu={
                                        <PostMenu
                                            item={blog}
                                            handleDeletePost={() => handleDeletePost(blog)}
                                            openFeaturePost={() => toggleFeaturePost(blog)}
                                        />
                                    }
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
                sideAction={() => fetchBlogs(dispatch)}
            />
            <BlogFilterDrawer />
            <FeaturePost
                open={featurePost}
                handleClose={() => toggleFeaturePost(null)}
                item={featurePost}
                redirect='/blogs/me'
            />
        </SettingsLayout>
    );
}

export default PublishedBlogsListing
