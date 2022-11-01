import * as React from 'react';
import Box from '@mui/material/Box';
// Components
import FeaturedCard from '../../components/FeaturedCard'

export default function Home() {
    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <FeaturedCard title="Mascota del día" />
            <FeaturedCard title="Mascota de la semana" />
        </Box>
    );
}
