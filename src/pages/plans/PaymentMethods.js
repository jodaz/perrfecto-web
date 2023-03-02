import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaypalIcon from '../../assets/icons/Paypal.png'
import StripeIcon from '../../assets/icons/Stripe.png'
import DebitCardIcon from '../../assets/icons/DebitCard.png'
import PaymentMethodButton from './PaymentMethodButton';

const PaymentMethods = () => (
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
            <PaymentMethodButton
                icon={PaypalIcon}
                title='Paypal'
            />
            <PaymentMethodButton
                icon={StripeIcon}
                title='Stripe'
            />
            <PaymentMethodButton
                icon={DebitCardIcon}
                title={`Tarjeta`}
            />
        </Stack>
    </Box>
)

export default PaymentMethods
