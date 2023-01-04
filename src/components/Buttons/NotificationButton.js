import * as React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import LinkBehavior from '../../components/LinkBehavior';
// Icons
import { Bell } from 'lucide-react';

const NotificationButton = ({ children }) => (
    <IconButton
        component={LinkBehavior}
        to='/notifications'
    >
        <Badge badgeContent={4} color="error">
            <Bell color='#fff' />
        </Badge>
    </IconButton>
)

export default NotificationButton;
