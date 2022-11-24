import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const BusinessHome = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative'
            }}
        >
            <Box sx={{
                display: 'flex',
                height: '24vh',
                background: theme => theme.palette.primary.main,
                width: '100%',
                zIndex: '10',
                position: 'absolute',
                top: 0,
                left: 0
            }} />
            <Box sx={{
                zIndex: '100',
                position: 'absolute',
                top: '5vh',
                color: '#fff'
            }}>
                <Typography variant="h3">
                    ¡Hola!
                </Typography>
                <Typography variant="subtitle1">
                    Aquí vas a poder gestionar y publicar todo lo relacionado a tu empresa.
                </Typography>
            </Box>
        </Box>
    );
}

export default BusinessHome;
