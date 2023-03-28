import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
// import Image from '../../assets/images/Footer.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import LinkBehavior from '../../components/LinkBehavior'

const Link = ({ children, to }) => (
    <Typography
        variant="body1"
        color="#fff"
        fontWeight='400'
        component={LinkBehavior}
        sx={{
            textDecoration: 'none',
            display: 'block',
            '&:hover': {
                textDecoration: 'underline'
            }
        }}
        gutterBottom
        to={to}
    >
        {children}
    </Typography>
)

const Footer = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Grid container sx={{
            backgroundColor: theme => theme.palette.primary.main,
            padding: `3rem ${isSmall ? '2rem' : '6rem'}`
        }}>
            <Grid item md={12} marginBottom='2rem'>
                <Grid container>
                    <Grid md={3} sm={12}>
                        <Typography
                            variant="h6"
                            textAlign='left'
                            color="secondary.main"
                            gutterBottom
                        >
                            TinderDogs
                        </Typography>
                        <Link to='/#meet'>
                            Conecta
                        </Link>
                        <Link to='/#how-it-works'>
                            ¿Como funciona?
                        </Link>
                        <Link to='/blogs'>
                            Blog
                        </Link>
                        <Link to='/business/register'>
                            Registrar negocio
                        </Link>
                    </Grid>
                    <Grid md={3} sm={12}>
                        <Typography
                            variant="h6"
                            textAlign='left'
                            color="secondary.main"
                            gutterBottom
                        >
                            Soporte
                        </Typography>
                        <Link>
                            Ayuda al usuario
                        </Link>
                    </Grid>
                    <Grid md={3} sm={12}>
                        <Typography
                            variant="h6"
                            textAlign='left'
                            color="secondary.main"
                            gutterBottom
                        >
                            Legal
                        </Typography>
                        <Link>
                            Políticas de privacidad
                        </Link>
                        <Link>
                            Términos y condiciones
                        </Link>
                    </Grid>
                    <Grid md={3} sm={12}>
                        <Typography
                            variant="h6"
                            textAlign='left'
                            color="secondary.main"
                            gutterBottom
                        >
                            Descargar la App
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
            <Grid item md={12}>
                <Box sx={{
                    height: 'fit-content',
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' }
                }}>
                    <Typography
                        variant="subtitle1"
                        textAlign={isSmall ? 'center' : 'left'}
                        color="secondary.main"
                    >
                        © {new Date().getFullYear()} TinderDogs. Todos los derechos reservados
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Footer
