import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import EllipseImage from '../../EllipseImage';
import { ArrowLeft } from 'lucide-react'
import SubscriptionsCarousel from '../../../pages/Landing/SubscriptionsCarousel'
import SuscriptionCard from '../../../pages/Landing/SuscriptionCard'
import { IconButton } from '@mui/material';
import LinkBehavior from '../../LinkBehavior';

const plans = [
    {
        name: 'Básica',
        price: 6.99,
        description: [
            'Acceso a todos los contenidos disponibles en los anuncios.',
            'Acceso ilimitado a todos los perfiles'
        ],
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(180deg, #A770EF 0%, #CF8BF3 48.96%, #FDB99B 100%)'
    },
    {
        name: 'Premium',
        price: 6.99,
        description: [
            'Acceso a  todos los contenidos disponibles de los anuncios',
            'Acceso ilimitado a todos los perfiles.',
            'Acceso a distintos packs de anuncios.'
        ],
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(180deg, #EF629F 0%, #EECDA3 100%);'
    },
    {
        name: 'PawLover',
        price: 8.99,
        description: [
            'Acceso a  todos los contenidos disponibles de los anuncios.',
            'Acceso ilimitado a todos los perfiles.',
            'Acceso a distintos packs de anuncios.'
        ],
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(90deg, #9D50BB 0%, #6E48AA 100%)'
    },
]

const BusinessSuscriptions = ({ location }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const navigate = useNavigate()
    const handleClose = () => navigate('/business')

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/business/suscriptions'}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: isSmall ? 'fit-content' : '1000px',
                height: 'fit-content',
                overflowX: 'hidden'
            }}>
                <Box sx={{
                    width: '100%',
                    backgroundColor: '#A167C9',
                    color: '#fff',
                    fontWeight: 400,
                    position: 'relative',
                    height: '175px',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    position: 'relative'
                }}>
                    <EllipseImage sx={{ top: 0, left: 0 }} n={'ChooseSuscription1'} />
                    <EllipseImage sx={{ bottom: 0, left: 200 }} n={'ChooseSuscription2'} />
                    <EllipseImage sx={{ top: 30, left: 450 }} n={'ChooseSuscription3'} />
                    <EllipseImage sx={{ top: 30, left: 450 }} n={'ChooseSuscription3'} />
                    <EllipseImage sx={{ top: 0, left: 650 }} n={'ChooseSuscription4'} />
                    <EllipseImage sx={{ bottom: 30, left: 825 }} n={'ChooseSuscription5'} />
                    <EllipseImage sx={{ bottom: 0, left: 600 }} n={'ChooseSuscription6'} />
                    <EllipseImage sx={{ top: 15, right: 30 }} n={'ChooseSuscription7'} />
                    <Box sx={{
                        margin: 5,
                        zIndex: 1000,
                        position: 'absolute',
                        top: 0
                    }}>
                        <Typography
                            variant="h4"
                            color="secondary.main"
                            sx={{ mb: 4, fontWeight: 500, display: 'inline-flex', alignItems: 'center' }}
                        >
                            <IconButton component={LinkBehavior} to={-1}>
                                <ArrowLeft color="#fff"/>
                            </IconButton>
                            <Box mr={2} />
                            Suscripciones
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: '100%',
                    color: '#fff',
                    fontWeight: 400,
                    position: 'relative',
                    height: '525px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {!isSmall ? (
                        <Stack
                            direction="row"
                            spacing={3}
                            justifyContent='center'
                        >
                            {plans.map(plan => <SuscriptionCard {...plan} />)}
                        </Stack>
                    ) : (
                        <SubscriptionsCarousel plans={plans} />
                    )}
                </Box>
            </Box>
        </Dialog>
    );
}

export default BusinessSuscriptions
