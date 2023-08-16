import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import vars from "../vars";

const stripePromise = loadStripe(vars.StripeClientID)

function StripeProvider({ children }) {

    const appearance = {
        theme: 'night',
    };

    const options = { appearance };

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    )
}

export {
    StripeProvider
}
