import * as React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import LinkBehavior from '../../components/LinkBehavior';
// Icons
import { Bell } from 'lucide-react';
import { socket } from '../../utils/socket'

const NotificationButton = () => {
    const [counter, setCounter] = React.useState(0)

    React.useEffect(() => {
        socket.on('notification', ({ count_notification }) => {
            setCounter(count_notification)
        })
    }, [socket])

    return (
        <IconButton
            component={LinkBehavior}
            to='/notifications'
        >
            <Badge badgeContent={counter} color="error">
                <Bell color='#fff' />
            </Badge>
        </IconButton>
    )
}

export default NotificationButton;
