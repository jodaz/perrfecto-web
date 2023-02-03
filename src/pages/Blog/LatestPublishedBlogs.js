import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PostCard from './PostCard';
import useEffectOnce from '../../utils/useEffectOnce';
import LinkBehavior from '../../components/LinkBehavior';
import { useBlogs, fetchBlogs } from '../../context/BlogContext';

const LatestPublishedBlogs = () => {
    const { state: { items }, dispatch } = useBlogs()
    const [blogs, setBlogs] = React.useState(items)

    useEffectOnce(() => { fetchBlogs(dispatch) }, []);

    React.useEffect(() => {
        setBlogs(items.slice(0, 2))
    }, [items])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            p: 2
        }}>
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
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '10px' }}>
                {(blogs.length) ? (
                    <Stack direction='column' spacing={2}>
                        {blogs.map(blog => (
                            <PostCard item={blog} />
                        ))}
                    </Stack>
                ) : (
                    <Typography variant="subtitle1">
                        Aún no has publicado ningún blog
                    </Typography>
                )}
            </Box>
            {(items.length > 2) && (
                <Button
                    component={LinkBehavior}
                    to='/blogs/me'
                    sx={{
                        padding: '1rem 0'
                    }}
                >
                    Ver todas
                </Button>
            )}
        </Box>
    );
}

export default LatestPublishedBlogs
