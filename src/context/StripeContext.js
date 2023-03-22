import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import vars from "../vars";

const stripePromise = loadStripe(vars.StripeClientID)

function StripeProvider({ children }) {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    )
}

export {
    StripeProvider
}
