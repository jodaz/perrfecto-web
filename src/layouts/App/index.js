import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Navigate } from 'react-router-dom'
import Aside from './Aside'
import vars from '../../vars';
import PawPrints from '../../assets/images/pawprints.svg'
import FeedCard from '../../components/FeedCard'
import { ReactComponent as Filter2Icon } from '../../assets/icons/Filter2.svg'
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
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    '&:before': {
                        content: '""',
                        background: `url(${PawPrints}) no-repeat center center fixed`,
                        backgroundSize: 'cover',
                        position: 'absolute',
                        bottom: 0,
                        height: '100%',
                        width: 'calc(100vw - 400px)',
                        zIndex: 0
                    }
                }}
            >
                <React.Suspense>
                    <Box width='450px' margin='2rem 0'>
                        <PopularMembers />
                    </Box>
                </React.Suspense>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    width: 'fit-content'
                }}>
                    <FeedCard />
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: '-80px'
                        }}
                    >
                        <Filter2Icon />
                    </Fab>
                </Box>
            </Box>
        </Box>
    );
}
