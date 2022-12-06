import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MuiList from '@mui/material/List';
import { logout, useAuth } from '../../context/AuthContext';
import LinkBehavior from '../../components/LinkBehavior';
import ProfileToolbar from '../../components/ProfileToolbar';
import { ListItemIcon } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const List = ({ children }) => (
    <MuiList sx={{
        padding: '8px !important',
        marginBottom: 1
    }}>
        {children}
    </MuiList>
)

const ListTitle = ({ children }) => (
    <ListItem component="div" disablePadding sx={{
        color: 'text.tertiary',
        fontWeight: 'bold',
        variant: 'body2',
        backgroundColor: '#ECECEC',
        borderRadius: '8px',
        padding: '10px',
        fontWeight: '500',
    }}>
        <ListItemText
            primary={children}
            primaryTypographyProps={{
                color: 'text.tertiary',
                variant: 'body2',
                textTransform: 'uppercase'
            }}
        />
    </ListItem>
)

const ListItemLink = ({ to, title }) => (
    <ListItem component={LinkBehavior} disablePadding to={to} sx={{
        borderRadius: '8px'
    }}>
        <ListItemButton sx={{ borderRadius: '8px', margin: '2px 0' }}>
            <ListItemText
                primary={title}
                primaryTypographyProps={{
                    color: 'text.secondary',
                    fontWeight: 'medium',
                    variant: 'body2',
                }}
            />
            <ListItemIcon sx={{ minWidth: 0 }}>
                <ChevronRight />
            </ListItemIcon>
        </ListItemButton>
    </ListItem>
)

const Settings = ({ children, title }) => {
    const { dispatch } = useAuth();

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box>
                    <ProfileToolbar title={title} />
                    {children}
                    <List>
                        <ListTitle>
                            Cuenta
                        </ListTitle>
                        <ListItemLink
                            to="/profile/account"
                            title="Cuenta de acceso"
                        />
                    </List>
                </Box>
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
