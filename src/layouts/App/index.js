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

const DesktopLayout = ({ user, isAuth, children }) => (
    <Box sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
    }}>
        <Aside>
            {children}
        </Aside>
        {(user.role == 'user' || !isAuth) ? <UsersHome /> : <BusinessHome />}
        <GuestWarningModal />
    </Box>
)

export default function AppLayout({ children }) {
    const { state: { user, isAuth } } = useAuth();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    if (!isSmall) {
        return (
            <DesktopLayout user={user} isAuth={isAuth}>
                {children}
            </DesktopLayout>
        )
    }

    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <Box sx={{
                height: '90vh',
                overflowY: 'scroll'
            }}>
                {children}
            </Box>
            <Box sx={{
                width: '100%',
                height: '10vh',
                position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 1000
            }}>
                <Navigation isSmall={isSmall} />
            </Box>
            <GuestWarningModal />
        </Box>
    );
}
