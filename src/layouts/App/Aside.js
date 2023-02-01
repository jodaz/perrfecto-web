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

const drawerWidth = '350px';

const Sidebar = ({ children }) => {
    const { state: { user } } = useAuth();
    const { state: { openFilter } } = useBusinesses()

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    border: 'none'
                },
                zIndex: 1000
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar sx={{
                backgroundColor: theme => theme.palette.primary.main,
                display: 'flex',
                justifyContent: (user.role == 'guest') ? 'center' : 'space-between'
            }}>
                {(user.role == 'user') && <Camera color="#fff" />}
                <Logo dark />
                <PrivateRoute authorize="user,business">
                    <NotificationButton />
                </PrivateRoute>
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
        </Drawer>
    )
}

export default Sidebar;
