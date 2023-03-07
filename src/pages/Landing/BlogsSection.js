import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce';
import BlogCard from './BlogCard';
import Stack from '@mui/material/Stack'
import BlogsCarousel from './BlogsCarousel';

const items = [
    {
        title: 'Adopción masiva en la ciudad de Madrid.',
        description: 'Mas de 1.500 personas decidieron adoptar en la ciudad de Madrid. Un record a nivel mundial.'
    },
    {
        title: 'Adopción masiva en la ciudad de Madrid.',
        description: 'Mas de 1.500 personas decidieron adoptar en la ciudad de Madrid. Un record a nivel mundial.'
    },
    {
        title: 'Adopción masiva en la ciudad de Madrid.',
        description: 'Mas de 1.500 personas decidieron adoptar en la ciudad de Madrid. Un record a nivel mundial.'
    },
    {
        title: 'Adopción masiva en la ciudad de Madrid.',
        description: 'Mas de 1.500 personas decidieron adoptar en la ciudad de Madrid. Un record a nivel mundial.'
    }
]

const initialState = [null, null, null, null];

const BlogsSection = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [blogs, setBlogs] = React.useState(initialState)

    const fetchBlogs = async () => {
        setBlogs(items)
        // try {
        //     const res = await apiProvider.get('api/blog/blogs')

        //     if (res.status >= 200 && res.status < 300) {
        //         const { data: { data: { data } } } = res;

        //         setBlogs(data)
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
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
                    spacing={3}
                    justifyContent='center'
                >
                    {blogs.slice(0, 3).map(blog => <BlogCard {...blog} />)}
                </Stack>
            ) : (
                <BlogsCarousel blogs={blogs.slice(0, 3)} />
            )}
        </Box>
    )
}

export default BlogsSection
