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
import { apiProvider } from '../../../api'
import useEffectOnce from '../../../utils/useEffectOnce';

const initialState = [null, null, null];

const BusinessSuscriptions = ({ location }) => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const navigate = useNavigate()
    const handleClose = () => navigate('/business')
    const [suscriptions, setSubscriptions] = React.useState(initialState)

    const fetchSubscriptions = async () => {
        try {
            const res = await apiProvider.get('/api/subscription/get-subscriptions')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setSubscriptions(data)
                setIsLoaded(true)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffectOnce(() => { fetchSubscriptions() }, []);

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
                {isLoaded && (
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
                                {suscriptions.map(plan => <SuscriptionCard data={plan} />)}
                            </Stack>
                        ) : (
                            <SubscriptionsCarousel plans={suscriptions} />
                        )}
                    </Box>
                )}
            </Box>
        </Dialog>
    );
}

export default BusinessSuscriptions
