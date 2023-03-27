import * as React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import LinkBehavior from '../../components/LinkBehavior';
// Icons
import { Bell } from 'lucide-react';
import { socket } from '../../utils/socket'
import { useNotifications, newNotification } from '../../context/NotificationContext'

const NotificationButton = ({
    iconColor = '#fff'
}) => {
    const { state: { counter }, dispatch } = useNotifications();

    React.useEffect(() => {
        socket.on('notification', ({ count_notification, notification }) => {
            newNotification(dispatch, { count_notification, notification });
        })
    }, [socket])

    return (
        <IconButton
            component={LinkBehavior}
            to='/notifications'
        >
            <Badge badgeContent={counter} color="error">
                <Bell color={iconColor} />
            </Badge>
        </IconButton>
    )
}

export default NotificationButton;
