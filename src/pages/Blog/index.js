import * as React from 'react';
import Box from '@mui/material/Box';
import FeaturedPosts from './FeaturedPosts';
import RecentPosts from './RecentPosts';
import PostShow from './PostShow';

export default function Blog() {
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
            <PostShow
                closePost={handleCloseSelectPost}
                {...selectedItem}
            />
        )
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ p: 2 }}>
                <RecentPosts openPost={handleSelectPost} />
                <Box mt={4} />
                <FeaturedPosts openPost={handleSelectPost} />
            </Box>
        </Box>
    );
}
