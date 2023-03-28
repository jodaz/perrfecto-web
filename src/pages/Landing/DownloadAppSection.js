import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from '../../assets/images/DownloadAppSection.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import AppleStore from '../../assets/icons/AppleStore.png'
import GooglePlay from '../../assets/icons/GooglePlay.png'

const DownloadAppSection = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            backgroundColor: theme => theme.palette.primary.main,
            height: 'fit-content',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' },
            padding: '5rem 2rem 4rem 2rem'
        }} id="meet">
            <Box sx={{
                textAlign: 'left',
                width: { sm: '80%', xs: '80%', md: '30%', lg: '30%' },
                margin: 'auto 0'
            }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="secondary.main"
                    fontSize='2rem'
                    gutterBottom
                >
                    Descubre una nueva forma de conectarte con otros amantes de las mascotas.
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="secondary.main"
                    fontSize='1rem'
                    gutterBottom
                >
                    Encuentra compañía para tus paseos, intercambia consejos
                    y trucos con otros dueños de perros, y descubre eventos
                    y actividades para perros en tu área.
                </Typography>
                <Box component="img" padding='10px' src={AppleStore} />
                <Box component="img" src={GooglePlay} />
            </Box>

            <Box
                component="img"
                src={Image}
                sx={{
                    width: isSmall ? '280px' : '480px',
                    height: isSmall ? '280px' : '420px',
                    marginTop: '2rem',
                    marginLeft: isSmall ? 0 : '4rem',
                    boxShadow: '-15px -15px 3px rgba(0, 0, 0, 0.15)',
                    borderRadius: '10%'
                }}
            />
        </Box>
    )
}

export default DownloadAppSection
