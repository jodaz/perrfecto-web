import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce';
import BlogCard from './BlogCard';
import Stack from '@mui/material/Stack'
import BlogsCarousel from './BlogsCarousel';

const initialState = [null, null, null, null];

const BlogsSection = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [blogs, setBlogs] = React.useState(initialState)

    const fetchBlogs = async () => {
        setBlogs(initialState)
        try {
            const res = await apiProvider.get('api/blog/blogs')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data: { data } } } = res;

                setBlogs(data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffectOnce(() => { fetchBlogs() }, []);

    return (
        <Box sx={{
            backgroundColor: theme => theme.palette.secondary.main,
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 6
        }}>
            <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary.main"
                fontSize='1.5rem'
                lineHeight={isSmall ? '28px' : '40px'}
                textAlign='left'
                maxWidth='800px'
                marginBottom='2rem'
            >
                Mantente informado sobre los cuidados de tu mascota y descubre consejos valiosos.
            </Typography>
            {!isSmall ? (
                <Stack
                    direction="row"
                    spacing={4}
                    justifyContent='center'
                >
                    {blogs.slice(0, 4).map(blog => <BlogCard data={blog} />)}
                </Stack>
            ) : (
                <BlogsCarousel blogs={blogs.slice(0, 4)} />
            )}
        </Box>
    )
}

export default BlogsSection
