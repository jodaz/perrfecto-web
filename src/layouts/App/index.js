import * as React from 'react';
import Box from '@mui/material/Box';
import { Navigate } from 'react-router-dom'
import Aside from './Aside'
import vars from '../../vars';
import PawPrints from '../../assets/images/pawprints.svg'
const PopularMembers = React.lazy(() => import('../../components/PopularMembers'));

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
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '4rem',
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
                <React.Suspense>
                    <Box width='450px'>
                        <PopularMembers />
                    </Box>
                </React.Suspense>
            </Box>
        </Box>
    );
}
