import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import CategoryCard from './CategoryCard';
import { selectItem, useBusinesses } from '../../context/BusinessContext';

const Categories = ({ data, loading }) =>  {
    const { dispatch } = useBusinesses();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
                variant="subtitle1"
                fontWeight={500}
                fontSize='1rem'
                mb={2}
                color="text.secondary"
                textTransform={'uppercase'}
            >
                Categorías
            </Typography>
            <Stack orientation="column" sx={{ alignItems: 'center' }} spacing={1}>
                {loading && <CircularProgress />}
                {data.map((item, i) => (
                    <CategoryCard
                        {...item}
                        handleClick={() => selectItem(dispatch, { item: item, type: 'category' })}
                    />
                ))}
            </Stack>
        </Box>
    )
};

export default Categories
