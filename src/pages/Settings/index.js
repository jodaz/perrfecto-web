import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { logout, useAuth } from '../../context/AuthContext';
import LinkBehavior from '../../components/LinkBehavior';
import ProfileToolbar from '../../components/ProfileToolbar';

const Settings = ({ children, title }) => {
    const { dispatch } = useAuth();

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <ProfileToolbar title={title} />
                {children}
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => logout(dispatch)}
                        component={LinkBehavior}
                        to='/'
                    >
                        Cerrar sesión
                    </Button>
                </Box>
            </Box>
        </Slide>
    );
}

export default Settings
