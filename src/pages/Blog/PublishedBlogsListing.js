import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PostCard from './PostCard';

const posts = [
    {
        title: '¿Cómo prevenir el frio en los perros?',
        image: '/images/samples/sad-pupi.png',
        published_at: new Date(),
        img_profile: '/images/samples/sad-pupi.png',
        name: 'Mason',
        lastName: 'Eduard',
        commentsCount: 12,
        likesCount: 187
    },
    {
        title: '¿Cómo prevenir el frio en los perros?',
        image: '/images/samples/sad-pupi.png',
        published_at: new Date(),
        img_profile: '/images/samples/sad-pupi.png',
        name: 'Mason',
        lastName: 'Eduard',
        commentsCount: 12,
        likesCount: 187
    },
    {
        title: '¿Cómo prevenir el frio en los perros?',
        image: '/images/samples/sad-pupi.png',
        published_at: new Date(),
        img_profile: '/images/samples/sad-pupi.png',
        name: 'Mason',
        lastName: 'Eduard',
        commentsCount: 12,
        likesCount: 187
    }
]

const PublishedBlogsListing = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <Typography
                variant="subtitle1"
                fontWeight={500}
                fontSize='1.2rem'
            >
                Mis blogs
            </Typography>
            <Stack
                direction={'column'}
                spacing={3}
                sx={{
                    mt: 2
                }}
            >
                {posts.map(post => <PostCard {...post} />)}
            </Stack>
        </Box>
    );
}

export default PublishedBlogsListing
