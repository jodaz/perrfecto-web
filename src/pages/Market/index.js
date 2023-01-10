import * as React from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FeaturedBusinesses from '../Businesses/FeaturedBusinesses';
import Categories from './Categories';
import MarketSearchBox from './MarketSearchBox';

const Marketplace = () => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column'
    }}>
        <Box p={2}>
            <Typography
                variant="subtitle"
                fontWeight={700}
                mb={2}
                fontSize='1.5rem'
            >
                Market
            </Typography>
        </Box>
        <MarketSearchBox />
        <Box p={2}>
            <FeaturedBusinesses />
        </Box>
        <Box p={2}>
            <Categories />
        </Box>
    </Box>
)

export default Marketplace
