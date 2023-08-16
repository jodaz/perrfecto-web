import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import LinkBehavior from '../LinkBehavior';
import { styled } from '@mui/material/styles';
import { Mail, MessageCircle } from 'lucide-react';

const ListItem = styled(MuiListItem)(({ theme }) => ({
    color: theme.palette.text.secondary
}))

const SelectMethod = () => (
    <>
        <Box>
            ¿Cómo deseas recuperar tu contraseña?
        </Box>
        <List sx={{ marginTop: '2rem' }}>
            <ListItem
                disablePadding
                component={LinkBehavior}
                to="/recover-password?method=email"
            >
                <ListItemButton>
                    <ListItemIcon>
                        <Mail />
                    </ListItemIcon>
                    <ListItemText primary="Enviar un correo electrónico" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem
                disablePadding
                component={LinkBehavior}
                to="/recover-password?method=sms"
            >
                <ListItemButton>
                    <ListItemIcon>
                        <MessageCircle />
                    </ListItemIcon>
                    <ListItemText primary="Enviar un SMS" />
                </ListItemButton>
            </ListItem>
        </List>
    </>
);

export default SelectMethod
