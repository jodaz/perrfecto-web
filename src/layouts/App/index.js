import * as React from 'react';
import Box from '@mui/material/Box';
import Aside from './Aside'
import { useAuth } from '../../context/AuthContext'
// Screens
import BusinessHome from './BusinessHome';
import UsersHome from './UsersHome';
import { useMediaQuery } from '@mui/material';
import Navigation from './Navigation';

export default function AppLayout({ children }) {
    const { state: { user } } = useAuth();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {(!isSmall) && (
                <Aside>
                    {children}
                </Aside>
            )}
            {(user.role == 'user') ? <UsersHome /> : <BusinessHome />}
            {(isSmall) && (
                <Box sx={{
                    position: 'fixed',
                    width: '100%',
                    bottom: 0,
                    left: 0,
                }}>
                    <Navigation />
                </Box>
            )}
        </Box>
    );
}
