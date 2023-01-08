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
        commentsCount: 12,
        likesCount: 187
    },
    {
        title: '¿Cómo prevenir el frio en los perros?',
        image: '/images/samples/sad-pupi.png',
        published_at: new Date(),
        commentsCount: 12,
        likesCount: 187
    },
    {
        title: '¿Cómo prevenir el frio en los perros?',
        image: '/images/samples/sad-pupi.png',
        published_at: new Date(),
        commentsCount: 12,
        likesCount: 187
    }
]

export default function FeaturedPosts({ openPost }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
                variant="subtitle1"
                fontWeight={500}
                fontSize='1.2rem'
            >
                Destacados
            </Typography>
            <Stack
                direction={'column'}
                spacing={3}
                sx={{
                    mt: 2
                }}
            >
                {posts.map(post => <PostCard {...post} handleClick={openPost} />)}
            </Stack>
        </Box>
    );
}
