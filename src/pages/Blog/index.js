import * as React from 'react';
import Box from '@mui/material/Box';
import FeaturedPosts from './FeaturedPosts';
import RecentPosts from './RecentPosts';

export default function Blog() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ p: 2 }}>
                <RecentPosts />
                <Box mt={4} />
                <FeaturedPosts />
            </Box>
        </Box>
    );
}
