import * as React from 'react';
import Box from '@mui/material/Box';
import Aside from './Aside'
import { socket } from '../../utils/socket';
import { useNotifications, newNotification } from '../../context/NotificationContext';
import { useMatch, match } from '../../context/MatchContext';
import { useAuth, renewToken, logout } from '../../context/AuthContext'
// Screens
import BusinessHome from './BusinessHome';
import UsersHome from './UsersHome';
import { useMediaQuery } from '@mui/material';
import Navigation from './Navigation';
import GuestWarningModal from '../../components/Modals/GuestWarningModal';
import GeolocationDrawer from '../../components/Drawers/GeolocationDrawer';
import FilterDrawer from '../../components/FilterDrawer';
import { useNavigate } from 'react-router-dom';

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
    const { state: { user, isAuth }, dispatch: authDispatch } = useAuth();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { dispatch } = useNotifications();
    const { dispatch: matchDispatch } = useMatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        socket.on('notification', response => {
            if (response.notification.type == 'match') {
                match(matchDispatch, response.notification)
            }
            if (response.notification.type == 'delete_publication') {
                renewToken(authDispatch, user)
            }
            if (response.notification.type == 'locked_user') {
                logout(authDispatch);
                return navigate('/account/locked')
            }

            newNotification(dispatch, response);
        })
    }, [socket])

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
        }} id="drawer-container">
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
                <GeolocationDrawer />
                <FilterDrawer />
            </Box>
            <GuestWarningModal />
        </Box>
    );
}
