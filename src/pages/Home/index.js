import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuth } from '../../context/AuthContext'
import InviteGuest from './InviteGuest';

const Home = ({ children }) => {
    const { state: { isAuth } } = useAuth();

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%'
        }}>
            {isAuth ? <>{children}</> : <InviteGuest />}
        </Box>
    );
}

export default Home
