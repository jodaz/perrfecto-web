import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { logout, useAuth } from '../../context/AuthContext';
import LinkBehavior from '../../components/LinkBehavior';
import { Divider, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft } from 'lucide-react';

const Settings = ({ children, title }) => {
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{ flex: 1 }}>
                    <Toolbar sx={{
                        width: '100%',
                        p: '0 !important',
                        boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.12)'
                    }}>
                        <Box>
                            <IconButton onClick={() => navigate(-1)}>
                                <ChevronLeft />
                            </IconButton>
                        </Box>
                        <Box sx={{ fontWeight: 500, flex: 1, textAlign: 'center' }}>
                            {title}
                        </Box>
                    </Toolbar>
                    <Divider />
                </Box>
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
