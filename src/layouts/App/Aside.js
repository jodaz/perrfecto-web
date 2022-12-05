import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Navigation from './Navigation';
import { useAuth } from '../../context/AuthContext'
import { Camera } from 'lucide-react';
import Logo from '../../components/Logo';
// Icons
import NotificationButton from './NotificationButton';

const drawerWidth = '350px';

const Sidebar = ({ children }) => {
    const { state: { user } } = useAuth();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                zIndex: 1000
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar sx={{
                backgroundColor: theme => theme.palette.primary.main,
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                {(user.role == 'user') && <Camera color="#fff" />}
                <Logo />
                <NotificationButton />
            </Toolbar>
            <Divider />
            <Navigation />
            <Box sx={{ height: '100%', maxWidth: 'inherit' }}>
                {children}
            </Box>
        </Drawer>
    )
}

export default Sidebar;
