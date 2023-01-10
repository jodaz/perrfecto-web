import * as React from 'react';
import Box from '@mui/material/Box'
import FeaturedBusinesses from '../Businesses/FeaturedBusinesses';
import Categories from './Categories';

const Marketplace = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box p={2}>
                <FeaturedBusinesses />
            </Box>
            <Box p={2}>
                <Categories />
            </Box>
        </Box>
    )
}

export default Marketplace
