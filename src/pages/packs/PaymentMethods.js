import * as React from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StripeIcon from '../../assets/icons/Stripe.png'
import DebitCardIcon from '../../assets/icons/DebitCard.png'
import PaymentMethodButton from './PaymentMethodButton';
import { useParams } from 'react-router-dom';
import PaypalButton from '../../components/Buttons/Paypal';

const PaymentMethods = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <Box sx={{
            marginTop: '1rem',
            width: '100%'
        }}>
            <Typography
                variant="subtitle1"
                gutterBottom
                color="text.secondary"
                marginBottom='2rem'
            >
                Elegir un método de pago
            </Typography>
            <Stack
                spacing={4}
                direction="row"
                margin='0 auto'
                justifyContent='center'
            >
                <PaypalButton itemID={id} />
                <PaymentMethodButton
                    icon={StripeIcon}
                    title='Stripe'
                    disabled={isLoading}
                />
                <PaymentMethodButton
                    icon={DebitCardIcon}
                    title={`Tarjeta`}
                    disabled={isLoading}
                />
            </Stack>
        </Box>
    )
}

export default PaymentMethods
