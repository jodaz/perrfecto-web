import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PostCard from './PostCard';
import PublishedBlog from './PublishedBlog';
import LinkBehavior from '../../components/LinkBehavior'
import { ArrowLeft } from 'lucide-react';

const posts = [
    {
        title: '¿Cómo prevenir el frio en los perros?',
        image: '/images/samples/sad-pupi.png',
        published_at: new Date(),
        img_profile: '/images/samples/sad-pupi.png',
        name: 'Mason',
        lastName: 'Eduard',
        commentsCount: 12,
        likesCount: 187,
        description: 'Pelos por el suelo, el sofá, la alfombra,… en aquellos lugares en los que nuestra'
    },
    {
        title: '¿Cómo prevenir el frio en los perros?',
        image: '/images/samples/sad-pupi.png',
        published_at: new Date(),
        img_profile: '/images/samples/sad-pupi.png',
        name: 'Mason',
        lastName: 'Eduard',
        commentsCount: 12,
        likesCount: 187,
        description: 'Pelos por el suelo, el sofá, la alfombra,… en aquellos lugares en los que nuestra'
    }
]

const LatestPublishedBlogs = () => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [showPost, setShowPost] = React.useState(false)

    const handleSelectPost = async (data) => {
        setSelectedItem(data);
        setShowPost(true);
    }

    const handleCloseSelectPost = () => {
        setShowPost(false)
    }

    if (showPost) {
        return (
            <PublishedBlog
                closePost={handleCloseSelectPost}
                {...selectedItem}
            />
        )
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            alignItems: 'flex-start'
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
            <Stack
                direction={'column'}
                spacing={3}
                sx={{
                    mt: 2
                }}
            >
                {posts.map(post =>
                    <PostCard
                        {...post}
                        handleClick={handleSelectPost}
                    />
                )}
            </Stack>
            <Box>
                <Button
                    component={LinkBehavior}
                    to='/blogs/me'
                >
                    Ver todas
                </Button>
            </Box>
        </Box>
    );
}

export default LatestPublishedBlogs
