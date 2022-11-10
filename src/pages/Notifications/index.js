import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationCard from './NotificationCard';

const notifications = [
    'Crea un anuncio de tu mascota para empezar a conocer a tu pareja ideal!',
    'Aprovecha nuestras promociones para que más personas puedan verte',
    'Has llegado a más de 1000 personas gracias a tu anuncio. Sigue así!',
    'Recuerda que te quedan 3 renovaciones en tu plan Standard. Úsalos!'
]

export default function Notifications() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Notificaciones
            </Typography>
            <Box>
                {notifications.map((item, i) => (
                    <NotificationCard>
                        {item}
                    </NotificationCard>
                ))}
            </Box>
        </Box>
    );
}
