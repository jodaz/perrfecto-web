import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Market from '../../assets/images/iPhone13.png'
import iPhoneAd from '../../assets/images/iPhone-AD.png'
import useMediaQuery from '@mui/material/useMediaQuery';

const HowItWorks = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            backgroundColor: theme => theme.palette.secondary.main,
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4
        }}>
            <Box sx={{
                textAlign: 'left',
                width: { sm: '80%', xs: '80%', md: '30%', lg: '30%' },
                margin: 'auto 0',
                textAlign: 'center'
            }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="text.main"
                    fontSize='2rem'
                    lineHeight={isSmall ? '32px' : '40px'}
                    gutterBottom
                >
                    ¿Cómo funciona?
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontSize='1rem'
                    gutterBottom
                >
                    Descubre las funcionalidades de nuestra App
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', md: 'row-reverse' },
                justifyContent: 'center',
                alignItems: 'center',
                p: 2
            }}>
                <Box sx={{
                    textAlign: 'left',
                    width: { sm: '80%', xs: '80%', md: '30%', lg: '30%' },
                    margin: 'auto 0'
                }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color="text.primary"
                        fontSize='2rem'
                        lineHeight={isSmall ? '32px' : '40px'}
                        gutterBottom
                    >
                        Localiza y conoce mascotas que se encuentren cerca de ti.
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        Crea un perfil para tu adorable mascota. Utiliza diferentes filtros para encontrar perros cercanos, por ubicación o razas que estes buscando.
                    </Typography>
                </Box>
                <Box
                    component="img"
                    src={iPhoneAd}
                    sx={{
                        width: '240px',
                        height: '480px',
                        marginTop: '1rem',
                        marginRight: isSmall ? 0 : '4rem'
                    }}
                />
            </Box>
        </Box>
    )
}

export default HowItWorks
