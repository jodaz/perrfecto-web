import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import LinkBehavior from '../../components/LinkBehavior';
// Icons
import { Bell } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext'

const NotificationButton = ({
    iconColor = '#fff'
}) => {
    const { state: { counter } } = useNotifications();

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
