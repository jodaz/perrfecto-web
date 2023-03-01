import Stack from '@mui/material/Stack';
import PaypalIcon from '../../assets/icons/Paypal.png'
// import StripeIcon from '../../assets/icons/StripeIcon.png'
import DebitCardIcon from '../../assets/icons/DebitCard.png'
import PaymentMethodButton from './PaymentMethodButton';

const PaymentMethods = () => (
    <Stack
        spacing={4}
        direction="row"
        margin='0 auto'
    >
        <PaymentMethodButton
            icon={PaypalIcon}
            title='Paypal'
        />
        <PaymentMethodButton
            icon={PaypalIcon}
            title='Stripe'
        />
        <PaymentMethodButton
            icon={DebitCardIcon}
            title={`Tarjeta`}
        />
    </Stack>
)

export default PaymentMethods
