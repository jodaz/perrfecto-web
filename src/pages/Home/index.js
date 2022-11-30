import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuth } from '../../context/AuthContext'
// Components
import FeaturedCard from '../../components/FeaturedCard'

const Home = () => {
    const { state: { user } } = useAuth();

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {/* {(user.role == 'business')
            ? <></>
            : <>
                <FeaturedCard title="Mascota del día" />
                <FeaturedCard title="Mascota de la semana" />
            </>} */}
        </Box>
    );
}

export default Home
