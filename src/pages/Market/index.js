import * as React from 'react';
import Box from '@mui/material/Box'
import FeaturedBusinesses from '../Businesses/FeaturedBusinesses';

const Marketplace = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box p={2}>
                <FeaturedBusinesses />
            </Box>
        </Box>
    )
}

export default Marketplace
