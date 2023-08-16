import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useSearchParams, matchRoutes } from 'react-router-dom';
import EllipseImage from '../../components/EllipseImage';
import useMediaQuery from '@mui/material/useMediaQuery';
import PaymentStatus from '../../components/PaymentStatus';
import PaymentCheckoutForm from '../../components/Forms/PaymentCheckoutForm';
import LinkBehavior from '../../components/LinkBehavior';
import { ArrowLeft } from 'lucide-react';
import DialogTitle from '../../components/DialogTitle';

const SuscriptionsCheckoutProcess = ({ location }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [searchParams, setSearchParams] = useSearchParams()
    const status = searchParams.get('status')
    const navigate = useNavigate();
    const openModal = matchRoutes([{ path: '/business/suscriptions/:id/checkout' }], location)

    const handleClose = () => navigate('/business')

    return (
        <Dialog
            onClose={handleClose}
            open={openModal}
        >
            <Box sx={{
                display: 'flex',
                width: isSmall ? 'fit-content' : '800px',
                height: '670px'
            }}>
                {!isSmall && (
                    <Box sx={{
                        flex: 1,
                        backgroundColor: '#A167C9',
                        color: '#fff',
                        fontWeight: 400,
                        position: 'relative',
                        overflowX: 'none'
                    }}>
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
                                Confirmar pago
                            </Typography>
                        </Box>
                        <EllipseImage sx={{ bottom: 0, right: 0 }} n={'Ellipse9'} />
                        <EllipseImage sx={{ right: '50px', top: '550px' }} n={'Ellipse8'} />
                        <EllipseImage sx={{ right: '50px', top: '550px' }} n={'Ellipse8'} />
                        <EllipseImage sx={{ right: '50px', top: '350px' }} n={'Ellipse7'} />
                        <EllipseImage sx={{ right: 0, top: '50px' }} n={'Ellipse6'} />
                        <EllipseImage sx={{ top: '200px', left: '150px' }} n={'Ellipse5'} />
                        <EllipseImage sx={{ top: '450px', left: '50px' }} n={'Ellipse4'} />
                        <EllipseImage sx={{ top: '200px' }} n={'Ellipse1'} />
                        <EllipseImage sx={{ bottom: '0' }} n={'Ellipse2'} />
                        <EllipseImage sx={{ top: '0' }} n={'Ellipse3'} />
                    </Box>
                )}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <DialogTitle onClose={handleClose} />
                    {status ? (
                        <PaymentStatus isSmall={isSmall} status={status} />
                    ) : <PaymentCheckoutForm isSubscription />}
                </Box>
            </Box>
        </Dialog>
    );
}

export default SuscriptionsCheckoutProcess
