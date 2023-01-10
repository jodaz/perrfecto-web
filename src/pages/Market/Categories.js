import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CategoryCard from './CategoryCard';

const categories = [
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
    },
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

const Categories = () =>  (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
            variant="subtitle1"
            fontWeight={500}
            fontSize='1.2rem'
            mb={2}
            color="text.secondary"
            textTransform={'uppercase'}
        >
            Categorías
        </Typography>
        <Stack orientation="column" spacing={1}>
            {categories.map((category, i) => (
                <CategoryCard {...category} />
            ))}
        </Stack>
    </Box>
);

export default Categories
