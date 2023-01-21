import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PostCard from './PostCard';
import LinkBehavior from '../../components/LinkBehavior'
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce';
import LoadingIndicator from '../../components/LoadingIndicator';

const MyBlogs = ({ blogs }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
        {(blogs.length) ? (
            <Stack
                direction={'column'}
                spacing={3}
                sx={{
                    mt: 2
                }}
            >
                {blogs.map(blog => <PostCard {...blog} /> )}
            </Stack>
        ) : (
            <Typography variant="subtitle1">
                Aún no has publicado ningún blog
            </Typography>
        )}
    </Box>
);

const PublishedBlogsListing = () => {
    const [loading, setLoading] = React.useState(true)
    const [blogs, setBlogs] = React.useState([])
    const { state: { isAuth } } = useAuth();

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
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1
            }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    fontSize='1.2rem'
                >
                    Mis blogs
                </Typography>
                {(isAuth) && (
                    <Button
                        component={LinkBehavior}
                        variant="outlined"
                        to='/blogs'
                        sx={{
                            fontSize: '0.9rem',
                            padding: '0.4rem 0.7rem',
                            fontWeight: 500
                        }}
                    >
                        <ArrowLeft /> Volver
                    </Button>
                )}
            </Box>
            {(loading)
                ? <LoadingIndicator />
                : <MyBlogs blogs={blogs} />
            }
        </Box>
    );
}

export default PublishedBlogsListing
