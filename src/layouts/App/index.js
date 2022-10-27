import * as React from 'react';
import Box from '@mui/material/Box';
import { Navigate } from 'react-router-dom'
import Aside from './Aside'
import vars from '../../vars';

export default function AppLayout({ children }) {
    const isAuthenticated = localStorage.getItem(vars.authToken);

    if (!isAuthenticated) return <Navigate to='/login' />;

    return (
        <Box sx={{ display: 'flex' }}>
            <Aside>
                {children}
            </Aside>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                Aquí estará el feed
            </Box>
        </Box>
    );
}
