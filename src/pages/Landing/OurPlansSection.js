import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';
import SuscriptionCard from './SuscriptionCard'

const initialState = [null, null, null];

const plan = {
    name: 'Suscripción básica',
    price: 6.99,
    description: [
        'Acceso a todos los contenidos disponibles en los anuncios.',
        'Acceso ilimitado a todos los perfiles'
    ]
}

const OurPlansSection = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
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
                gutterBottom
            >
                Suscríbete a nuestros planes para acceder a diferentes promociones, funcionalidades y accesos para tu empresa.
            </Typography>
            <Box sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center'
            }}>
                <SuscriptionCard {...plan} />
            </Box>
        </Box>
    )
}

export default OurPlansSection
