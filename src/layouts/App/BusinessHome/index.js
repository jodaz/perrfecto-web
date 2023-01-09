import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EllipseImage from '../../../components/EllipseImage';

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
                left: 0,
                position: 'relative'
            }}>
                <EllipseImage sx={{ top: 0, left: 0}} n='BussinesEllipse1' />
                <EllipseImage sx={{ bottom: 0, left: 150}} n='BussinesEllipse2' />
                <EllipseImage sx={{ top: 20, left: 400 }} n='BussinesEllipse3' />
                <EllipseImage sx={{ bottom: 0, right: 400 }} n='BussinesEllipse4' />
                <EllipseImage sx={{ top: 0, right: 300 }} n='BussinesEllipse5' />
                <EllipseImage sx={{ bottom: 20, right: 180 }} n='BussinesEllipse6' />
                <EllipseImage sx={{ top: 0, right: 0 }} n='BussinesEllipse7' />
            </Box>
            <Box sx={{
                zIndex: '100',
                position: 'absolute',
                top: '5vh',
                padding: '0 1rem',
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
