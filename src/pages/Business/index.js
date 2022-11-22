import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
// Images
import Dog1 from '../../assets/images/Dog1.png'
import Dog2 from '../../assets/images/Dog2.png'

const Business = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            height: '100vh',
            transition: 'all 0.3s ease-out 0s',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                        Crea tu tienda en pocos pasos y pronto estará disponible
                        para destacar en TinderDogs y llegar a nuevos clientes.
                    </Typography>
                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        height: '350px'
                    }}>
                        <Box component='div' sx={{
                            background: `url(${Dog1}) no-repeat center center`,
                            height: '250px',
                            width: '225px',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1000
                        }} />
                        <Box component='div' sx={{
                            background: `url(${Dog2}) no-repeat center center`,
                            height: '250px',
                            width: '225px',
                            position: 'absolute',
                            top: '25%',
                            left: '50%',
                            zIndex: 10
                        }} />
                    </Box>
                </Box>
                <Box sx={{ p: 1, textAlign: 'center' }}>
                    <Button variant="contained">
                        Registrar negocio
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Business;
