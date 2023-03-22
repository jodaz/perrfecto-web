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

const PaymentCheckoutForm = () => {
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
            // create a payment method
            const paymentMethod = await stripe?.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
                billing_details: values,
            });

            const response = await apiProvider.post("/api/stripe/checkout", {
                stripe_id: paymentMethod?.paymentMethod?.id,
                pack_id: id
            });

            if (response.status >= 200 && response.status < 300) {
                navigate(`/profile/settings/packs/${id}/checkout?status=success`)
            } else {
                navigate(`/profile/settings/packs/${id}/checkout?status=refused`)
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
            >
                Confirmar pago
            </Button>
        </Box>
    );
}

export default PaymentCheckoutForm;
