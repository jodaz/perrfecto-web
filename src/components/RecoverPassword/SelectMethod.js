import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import EmailSendIcon from '../../assets/icons/EmailSend'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { ReactComponent as MessageIcon2 } from '../../assets/icons/Message2.svg'
import LinkBehavior from '../LinkBehavior';

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
                        <EmailSendIcon />
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
                        <MessageIcon2 />
                    </ListItemIcon>
                    <ListItemText primary="Enviar un SMS" />
                </ListItemButton>
            </ListItem>
        </List>
    </>
);

export default SelectMethod
