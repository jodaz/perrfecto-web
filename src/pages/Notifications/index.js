import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import NotificationCard from './NotificationCard';
import useEffectOnce from '../../utils/useEffectOnce'
import LoadingIndicator from '../../components/LoadingIndicator';
import { useNotifications, fetchNotifications } from '../../context/NotificationContext'

export default function Notifications() {
    const { state: { items, isLoading }, dispatch } = useNotifications()

    useEffectOnce(() => { fetchNotifications(dispatch) })

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Notificaciones
            </Typography>
            <Box>
                {!isLoading ? (
                    <Stack
                        direction={'column'}
                        spacing={3}
                        sx={{
                            mt: 2
                        }}
                    >
                        {items.map((item) => (
                            <NotificationCard {...item} />
                        ))}
                    </Stack>
                ) : <LoadingIndicator />}
                {!(items.length) && (
                    <Typography variant="subtitle1">
                        Sin nuevas notificaciones.
                   </Typography>
                )}
            </Box>
        </Box>
    );
}
