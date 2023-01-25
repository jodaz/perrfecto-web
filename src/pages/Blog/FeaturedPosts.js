import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LoadingIndicator from '../../components/LoadingIndicator'
import PostCard from './PostCard';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce';

const FeaturedPosts = () => {
    const [loading, setLoading] = React.useState(true)
    const [blogs, setBlogs] = React.useState([])

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const res = await apiProvider.get('api/blog/blogs')

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

    if (loading) return <LoadingIndicator />

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {(blogs.length) ? (
                <Stack
                    direction={'column'}
                    spacing={3}
                    sx={{
                        mt: 2
                    }}
                >
                    {blogs.map(post => <PostCard item={post} />)}
                </Stack>
            ) : (
                <Typography variant="subtitle1">
                    Aún no tenemos blogs destacados
                </Typography>
            )}
        </Box>
    );
}

export default FeaturedPosts
