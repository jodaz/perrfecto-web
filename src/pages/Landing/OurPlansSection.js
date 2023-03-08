import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';
import SuscriptionCard from './SuscriptionCard'
import SubscriptionsCarousel from './SubscriptionsCarousel'

const initialState = [null, null, null];

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

const OurPlansSection = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [suscriptions, setSubscriptions] = React.useState(initialState)

    const fetchSubscriptions = async () => {
        try {
            const res = await apiProvider.get('/api/subscription/get-subscriptions')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setSubscriptions(data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffectOnce(() => { fetchSubscriptions() }, []);

    return (
        <Box sx={{
            textAlign: 'center',
            width: { sm: '80%', xs: '80%', md: '30%', lg: '30%' },
            margin: 'auto 0',
            backgroundColor: '#F6F6F6',
            width: '100%',
            justifyContent: 'center',
            padding: '4rem 0'
        }}>
            <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.primary"
                fontSize='2rem'
                lineHeight={isSmall ? '32px' : '40px'}
                gutterBottom
            >
                Conoce nuestros planes para empresa.
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                marginBottom='2rem'
            >
                Suscríbete a nuestros planes para acceder a diferentes promociones, funcionalidades y accesos para tu empresa.
            </Typography>
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
    )
}

export default OurPlansSection
