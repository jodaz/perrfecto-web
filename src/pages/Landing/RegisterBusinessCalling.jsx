import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from '../../assets/images/iPhone13.png'
import Responsive from '../../assets/images/iPhone13-Cut.png'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery';
import LinkBehavior from '../../components/LinkBehavior';

const RegisterBusinessCalling = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            backgroundColor: '#F3F3F3',
            height: 'fit-content',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            padding: 4
        }}>
            <Box sx={{
                textAlign: 'left',
                width: { sm: '80%', xs: '80%', md: '30%', lg: '30%' },
                margin: 'auto 0'
            }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="primary.main"
                    fontSize='2rem'
                    lineHeight={isSmall ? '32px' : '40px'}
                    gutterBottom
                >
                    ¡Llega a un público apasionado de los perros con nuestra aplicación!
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.primary"
                    fontSize='1rem'
                    gutterBottom
                >
                    Anunciate con nosotros y llega a miles de dueños de perros dispuestos a comprar productos y servicios para sus mascotas.
                    ¡Crea tu perfil hoy para comenzar a expandir tu alcance!
                </Typography>
                <Box margin={'20px auto'} width='100%'>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth={isSmall ? true : false}
                        component={LinkBehavior}
                        to='/business'
                    >
                        Registra tu negocio
                    </Button>
                </Box>
            </Box>
            <Box
                component="img"
                src={isSmall ? Responsive : Image}
                sx={{
                    width: isSmall ? '200px' : '240px',
                    height: isSmall ? '240px' : '480px',
                    marginTop: '1rem',
                    marginLeft: isSmall ? 0 : '4rem'
                }}
            />
        </Box>
    )
}

export default RegisterBusinessCalling
