import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Navigation from './Navigation';
import { useAuth } from '../../context/AuthContext'
import { Camera } from 'lucide-react';
import Logo from '../../components/Logo';
import PrivateRoute from '../../components/PrivateRoute';
// Icons
import NotificationButton from './NotificationButton';
import FilterDrawer from '../../components/FilterDrawer';
import { useBusinesses } from '../../context/BusinessContext';
import GeolocationDrawer from '../../components/Drawers/GeolocationDrawer';
import { Link } from 'react-router-dom';

const drawerWidth = '350px';

const Sidebar = ({ children }) => {
    const { state: { user } } = useAuth();
    const { state: { openFilter } } = useBusinesses()

    return (
        <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    border: 'none'
                },
                width: drawerWidth,
                flexShrink: 0,
                zIndex: 1000,
                scrollbarColor: "#E5E5E5 #E5E5E5",
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                    backgroundColor: "#E5E5E5",
                    width: '8px',
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                    borderRadius: 8,
                    backgroundColor: "#959595",
                    minHeight: 12,
                    border: "1px solid #959595",
                },
                "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                    backgroundColor: "#959595",
                },
                "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                    backgroundColor: "#959595",
                },
                "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#959595",
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar sx={{
                backgroundColor: theme => theme.palette.primary.main,
                display: 'flex',
                justifyContent: (user.role == 'guest' || user.role == 'business')
                    ? 'center'
                    : 'space-between'
            }}>
                {(user.role == 'user') && <Camera color="#fff" />}
                <Link to='/'>
                    <Logo dark />
                </Link>
                {(user.role == 'user') && (
                    <PrivateRoute authorize="user,business">
                        <NotificationButton />
                    </PrivateRoute>
                )}
            </Toolbar>
            <Divider />
            <Navigation />
            <Box
                sx={{
                    height: '100%',
                    maxWidth: drawerWidth,
                    overflowY: openFilter ? 'hidden !important' : 'unset'
                }}
                id="drawer-container"
            >
                {children}
            </Box>
            <FilterDrawer />
            <GeolocationDrawer />
        </Drawer>
    )
}

export default Sidebar;
