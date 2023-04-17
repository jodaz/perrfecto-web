import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FeaturedPosts from './FeaturedPosts';
import Typography from '@mui/material/Typography';
import RecentPosts from './RecentPosts';
import LinkBehavior from '../../components/LinkBehavior'
import { useAuth } from '../../context/AuthContext';

const Blog = () => {
    const { state: { isAuth } } = useAuth()

    return (
        <Box sx={{ display: 'flex', width: 'inherit' }}>
            <Box sx={{ p: 2, flex: 1 }}>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}>
                    <Typography
                        variant="h5"
                        fontWeight={500}
                        sx={{ flex: 1 }}
                    >
                        Recientes
                    </Typography>
                    {(isAuth) && (
                        <Button
                            component={LinkBehavior}
                            variant="outlined"
                            to='/blogs/me'
                            size='small'
                            sx={{
                                fontSize: '0.9rem',
                                padding: '0.4rem 0.7rem',
                                fontWeight: 500
                            }}
                        >
                            Ver mis blogs
                        </Button>
                    )}
                </Box>
                <RecentPosts />
                <Box mt={4} />
                <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    fontSize='1.2rem'
                >
                    Destacados
                </Typography>
                <FeaturedPosts />
            </Box>
        </Box>
    );
}

export default Blog
