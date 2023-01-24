import * as React from 'react';
import Box from '@mui/material/Box';
import Aside from './Aside'
import { useAuth } from '../../context/AuthContext'
// Screens
import BusinessHome from './BusinessHome';
import UsersHome from './UsersHome';
import { useMediaQuery } from '@mui/material';
import Navigation from './Navigation';
import GuestWarningModal from '../../components/Modals/GuestWarningModal';

export default function AppLayout({ children }) {
    const { state: { user, isAuth } } = useAuth();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: isSmall ? 'column' : 'row',
            height: '100%'
        }}>
            {(!isSmall) ? (
                <>
                    <Aside>
                        {children}
                    </Aside>
                    {(user.role == 'user' || !isAuth) ? <UsersHome /> : <BusinessHome />}
                </>
            ) : (
                <Box sx={{
                    height: '90vh',
                    overflowY: 'scroll'
                }}>
                    {children}
                </Box>
            )}
            {(isSmall) && (
                <Box sx={{
                    width: '100%',
                    height: '10vh'
                }}>
                    <Navigation isSmall={isSmall} />
                </Box>
            )}
            <GuestWarningModal />
        </Box>
    );
}
