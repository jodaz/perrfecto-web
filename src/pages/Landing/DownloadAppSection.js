import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from '../../assets/images/DownloadAppSection.png'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery';
import LinkBehavior from '../../components/LinkBehavior';

const DownloadAppSection = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            backgroundColor: theme => theme.palette.primary.main,
            height: isSmall ? 'fit-content' : '600px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' },
            padding: 2
        }}>
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
            </Box>

            <Box
                component="img"
                src={Image}
                sx={{
                    width: isSmall ? '280px' : '480px',
                    height: isSmall ? '280px' : '420px',
                    marginTop: '2rem',
                    marginLeft: isSmall ? 0 : '4rem',
                    boxShadow: '0px 1.74828px 8.74138px rgba(0, 0, 0, 0.15)'
                }}
            />
        </Box>
    )
}

export default DownloadAppSection
