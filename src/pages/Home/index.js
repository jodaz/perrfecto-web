import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuth } from '../../context/AuthContext'
// Components
import { useMediaQuery } from '@mui/material';
import UsersHome from '../../layouts/App/UsersHome';
import BusinessHome from '../../layouts/App/BusinessHome';

const Home = () => {
    const { state: { user, isAuth } } = useAuth();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const generateContent = () => {
        if (!isSmall) {
            return null;
        }
        return (
            <>
                {(user.role == 'user' || !isAuth) ? <UsersHome /> : <BusinessHome />}
            </>
        )
    }

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {generateContent()}
        </Box>
    );
}

export default Home
