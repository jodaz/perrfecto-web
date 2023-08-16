import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';
import SuscriptionCard from './SuscriptionCard'
import SubscriptionsCarousel from './SubscriptionsCarousel'

const OurPlansSection = () => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [suscriptions, setSubscriptions] = React.useState([])

    const fetchSubscriptions = async () => {
        try {
            const res = await apiProvider.get('/api/subscription/get-subscriptions')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                console.log()
                setSubscriptions(data)
                setIsLoaded(true)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffectOnce(() => { fetchSubscriptions() }, []);

    if (!isLoaded) return null;

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
                    {suscriptions.map(plan => <SuscriptionCard data={plan} />)}
                </Stack>
            ) : (
                <SubscriptionsCarousel plans={suscriptions} />
            )}
        </Box>
    )
}

export default OurPlansSection
