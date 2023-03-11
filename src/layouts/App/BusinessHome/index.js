import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EllipseImage from '../../../components/EllipseImage';
import { ReactComponent as RocketIcon } from '../../../assets/icons/Rocket.svg'
import { ReactComponent as BlogIcon } from '../../../assets/icons/Blog.svg'
import IconButtonWithTitle from '../../../components/IconButtonWithTitle';
import LogoutButton from '../../../components/Buttons/LogOutButton';
import { useMediaQuery } from '@mui/material';

const BusinessHome = () => {
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('md'));

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
            {isLarge && <LogoutButton dark />}
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
                <EllipseImage sx={{ top: 0, left: 0}} n='BusinessEllipse1' />
                <EllipseImage sx={{ bottom: 0, left: 150}} n='BusinessEllipse2' />
                <EllipseImage sx={{ top: 20, left: 400 }} n='BusinessEllipse3' />
                <EllipseImage sx={{ bottom: 0, right: 400 }} n='BusinessEllipse4' />
                <EllipseImage sx={{ top: 0, right: 300 }} n='BusinessEllipse5' />
                <EllipseImage sx={{ bottom: 20, right: 180 }} n='BusinessEllipse6' />
                <EllipseImage sx={{ top: 0, right: 0 }} n='BusinessEllipse7' />
            </Box>
            <Box sx={{
                zIndex: '100',
                position: 'absolute',
                top: '5vh',
                padding: '0 1rem',
                color: '#fff',
                width: isLarge ? '360px' : '200px',
                left: '50px'
            }}>
                <Typography variant="h3">
                    ¡Hola!
                </Typography>
                <Typography variant="subtitle1">
                    Aquí vas a poder gestionar y publicar todo lo relacionado a tu empresa.
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { sm: '100%', md: 400 },
                p: 4
            }}>
                <Typography
                    fontWeight={500}
                    variant="subtitle1"
                    color="text.tertiary"
                >
                    ESCOGE QUE DESEAS CREAR
                </Typography>
                <Stack direction='row' spacing={2} mt={2}>
                    <IconButtonWithTitle
                        title="Negocio"
                        icon={<RocketIcon />}
                        to='/businesses'
                    />
                    <IconButtonWithTitle
                        title="Blog"
                        icon={<BlogIcon />}
                        to='/blogs/create'
                    />
                </Stack>
            </Box>
        </Box>
    );
}

export default BusinessHome;
