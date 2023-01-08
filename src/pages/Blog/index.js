import * as React from 'react';
import Box from '@mui/material/Box';
import FeaturedPosts from './FeaturedPosts';

export default function Blog() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ p: 2 }}>
                <FeaturedPosts />
            </Box>
        </Box>
    );
}
