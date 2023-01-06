import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuth } from '../../context/AuthContext';

const Profile = ({ children }) => {
    const { state: { isAuth } } = useAuth();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            height: '100%'
        }}>
            {children}
        </Box>
    )
};

export default Profile
