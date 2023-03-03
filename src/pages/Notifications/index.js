import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationCard from './NotificationCard';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce'

export default function Notifications() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [notifications, setNotifications] = React.useState([])

    const fetchNotifications = async () => {
        setIsLoading(true)
        try {
            const response = await apiProvider.get('/api/notification/get-notifications')

            if (response.status >= 200 || response.status < 300) {
                const { data: { data } } = response;
                setIsLoading(false)

                setNotifications(data)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffectOnce(() => fetchNotifications(), [])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Notificaciones
            </Typography>
            <Box>
                {notifications.map((item, i) => (
                    <NotificationCard {...item} />
                ))}
            </Box>
        </Box>
    );
}
