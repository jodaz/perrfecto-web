import * as React from 'react';
import Box from '@mui/material/Box';
import Aside from './Aside'
import { useAuth } from '../../context/AuthContext'
// Screens
import BusinessHome from './BusinessHome';
import UsersHome from './UsersHome';

export default function AppLayout({ children }) {
    const { state: { user } } = useAuth();

    return (
        <Box sx={{ display: 'flex' }}>
            <Aside>
                {children}
            </Aside>
            {(user.role == 'business') ? <BusinessHome /> : <UsersHome />}
        </Box>
    );
}
