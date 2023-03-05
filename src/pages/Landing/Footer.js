import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
// import Image from '../../assets/images/Footer.png'
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            backgroundColor: theme => theme.palette.primary.main,
            height: 'fit-content',
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' },
            padding: '2rem'
        }}>
            <Typography
                variant="subtitle1"
                textAlign={isSmall ? 'center' : 'left'}
                color="secondary.main"
            >
                © {new Date().getFullYear()} TinderDogs. Todos los derechos reservados
            </Typography>
        </Box>
    )
}

export default Footer
