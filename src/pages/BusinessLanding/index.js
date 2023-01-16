import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinkBehavior from '../../components/LinkBehavior';
import { Outlet } from 'react-router-dom'
// Images
import Dog1 from '../../assets/images/Dog1.png'
import Dog2 from '../../assets/images/Dog2.png'

const BusinessLanding = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            height: '100%',
            transition: 'all 0.3s ease-out 0s',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: matches ? '4rem' : '6rem',
            background: 'linear-gradient(0deg, rgba(161, 103, 201, 0.1), rgba(161, 103, 201, 0.1)), #FFFFFF;'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: !matches ? '400px' : '800px'
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
                    flexDirection: matches ? 'column-reverse' : 'column',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Box sx={{
                        position: 'relative',
                        height: '350px',
                        width: `${matches ? 225 : 250}px`,
                        margin: '0 auto'
                    }}>
                        <Box component='div' sx={{
                            background: `url(${Dog1}) no-repeat center center`,
                            height: matches ? '200px' : '250px',
                            width: matches ? '175px' : '225px',
                            position: 'absolute',
                            borderRadius: '10px',
                            top: 0,
                            left: 0,
                            zIndex: 1
                        }}>
                            <Box component='div' sx={{
                                background: `url(${Dog2}) no-repeat center center`,
                                height: matches ? '200px' : '250px',
                                width: matches ? '175px' : '225px',
                                borderRadius: '10px',
                                position: 'absolute',
                                top: '25%',
                                left: matches ? '40%' : '50%',
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
}

export default BusinessLanding;
