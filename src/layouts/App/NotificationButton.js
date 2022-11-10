import * as React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import LinkBehavior from '../../components/LinkBehavior';
// Icons
import { ReactComponent as NotificationIcon } from '../../assets/icons/Notification.svg'

const NotificationButton = ({ children }) => (
    <IconButton
        component={LinkBehavior}
        to='/notifications'
    >
        <Badge badgeContent={4} color="error">
            <NotificationIcon />
        </Badge>
    </IconButton>
)

export default NotificationButton;
