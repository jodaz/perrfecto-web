import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import LinkBehavior from '../../components/LinkBehavior';
import { Outlet } from 'react-router-dom'
// Images
import Dog1 from '../../assets/images/Dog1.png'
import Dog2 from '../../assets/images/Dog2.png'

const BusinessLanding = () => (
    <Box sx={{
        height: '100vh',
        transition: 'all 0.3s ease-out 0s',
        position: 'relative',
        display: 'flex',
        paddingBottom: { xs: '120px' },
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(0deg, rgba(161, 103, 201, 0.1), rgba(161, 103, 201, 0.1)), #FFFFFF;'
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: {xs: '300px', sm: '300px', md: '400px' },
            position: 'absolute',
            top: '100px'
        }}>
            <Box sx={{ p: 1 }}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 500 }}>
                    Empieza a promocionar tu negocio
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="text.secondary">
                    Crea tu tienda en pocos pasos y pronto estará disponible
                    para destacar en TinderDogs y llegar a nuevos clientes.
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'column' },
                alignItems: 'center',
                width: '100%'
            }}>
                <Box sx={{
                    position: 'relative',
                    height: '350px',
                    width: { xs: '225px', sm: '225px', md: '250px' },
                    margin: '0 auto'
                }}>
                    <Box component='div' sx={{
                        background: `url(${Dog1}) no-repeat center center`,
                        height: { xs: '200px', sm: '200px', md: '250px' },
                        width: { xs: '175px', sm: '175px', md: '225px' },
                        position: 'absolute',
                        borderRadius: '10px',
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}>
                        <Box component='div' sx={{
                            background: `url(${Dog2}) no-repeat center center`,
                            height: { xs: '200px', sm: '200px', md: '250px' },
                            width: { xs: '175px', sm: '175px', md: '225px' },
                            borderRadius: '10px',
                            position: 'absolute',
                            top: '25%',
                            left: { xs: '40%', sm: '40%', md: '50%' },
                            zIndex: 10
                        }} />
                    </Box>
                </Box>
                <Box sx={{ p: 1 }}>
                    <Button variant="contained" component={LinkBehavior} to="register">
                        Registrar negocio
                    </Button>
                </Box>
            </Box>
        </Box>
        <Outlet />
    </Box>
);

export default BusinessLanding;
