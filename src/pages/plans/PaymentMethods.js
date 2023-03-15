import * as React from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaypalIcon from '../../assets/icons/Paypal.png'
import StripeIcon from '../../assets/icons/Stripe.png'
import DebitCardIcon from '../../assets/icons/DebitCard.png'
import PaymentMethodButton from './PaymentMethodButton';
import { apiProvider } from '../../api';
import { useParams } from 'react-router-dom';

const PaymentMethods = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = React.useState(false);

    const requestPayment = async () => {
        setIsLoading(true)

        try {
            const res = await apiProvider.post(`/api/paypal/request-payment`, {
                pack_id: id
            })

            if (res.status >= 200 && res.status < 300) {
                setIsLoading(false)
                console.log(res.data);
            }
        } catch (error) {
            setIsLoading(false)
            console.log("error ", error)
        }
    }

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
                <PaymentMethodButton
                    icon={PaypalIcon}
                    title='Paypal'
                    onClick={requestPayment}
                    disabled={isLoading}
                />
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
