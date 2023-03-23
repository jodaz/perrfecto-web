import * as React from 'react'
import {
    CardElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import { Button, Box } from "@mui/material";
import { apiProvider } from '../../api'
import TextInput from './TextInput'
import { useForm } from 'react-hook-form';
import { NAME } from '../../validations';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentCheckoutForm = ({ isSubscription }) => {
    const { id } = useParams()
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm()
    const navigate = useNavigate()

    // stripe items
    const stripe = useStripe();
    const elements = useElements();

    // main function
    const createSubscription = async ({ values }) => {
        try {
            const successRedirect = isSubscription
                ? `/business/suscriptions/${id}/checkout?status=success`
                : `/profile/settings/packs/${id}/checkout?status=success`;
            const refusedRedirect = isSubscription
                ? `/business/suscriptions/${id}/checkout?status=refused`
                : `/profile/settings/packs/${id}/checkout?status=refused`;
            const apiEndpoint = isSubscription ? "/api/stripe/new-request-subscription" : "/api/stripe/checkout"
            const data = {}

            // create a payment method
            const paymentMethod = await stripe?.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
                billing_details: values,
            });

            if (isSubscription) {
                data.plan_id = 2;
                data.payment_method = paymentMethod?.paymentMethod?.id;
            } else {
                data.stripe_id = paymentMethod?.paymentMethod?.id;
                data.pack_id = id;
            }

            const response = await apiProvider.post(apiEndpoint, data);

            if (response.status >= 200 && response.status < 300) {
                navigate(successRedirect)
            } else {
                navigate(refusedRedirect)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(createSubscription)}
            sx={{
                m: 1,
                flex: 1
            }}
        >
            <Box p={2}>
                <TextInput
                    label="Propietari@"
                    control={control}
                    name="name"
                    rules={NAME.rules}
                    validations={NAME.messages}
                    disabled={isSubmitting}
                    placeholder='Nombre del titular'
                />
            </Box>
            <Box p={2}>
                <CardElement />
            </Box>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
            >
                Confirmar pago
            </Button>
        </Box>
    );
}

export default PaymentCheckoutForm;
