import * as React from 'react';
import Box from '@mui/material/Box'
import FeaturedBusinessCard from '../Businesses/FeaturedBusinessCard';

const featuredBusinesses = [
    {
        title: 'Petshop',
        image: '/images/samples/sad-pupi.png',
    },
    {
        title: 'Accesorios para perros',
        image: '/images/samples/sad-pupi.png',
    },
    {
        title: 'Busco un hogar',
        image: '/images/samples/sad-pupi.png',
    }
]

const Marketplace = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            {featuredBusinesses.map(item => <FeaturedBusinessCard {...item} />)}
        </Box>
    )
}

export default Marketplace
