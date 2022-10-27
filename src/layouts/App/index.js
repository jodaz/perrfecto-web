import * as React from 'react';
import Box from '@mui/material/Box';
import { Navigate } from 'react-router-dom'
import Aside from './Aside'
import vars from '../../vars';
import PawPrints from '../../assets/images/pawprints.svg'

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
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    height: '100vh',
                    '&:before': {
                        content: '""',
                        background: `url(${PawPrints}) no-repeat center center fixed`,
                        backgroundSize: 'cover',
                        position: 'absolute',
                        bottom: 0,
                        height: '100%',
                        width: 'calc(100vw - 350px)',
                        zIndex: 0
                    }
                }}
            >
                Aquí estará el feed
            </Box>
        </Box>
    );
}
