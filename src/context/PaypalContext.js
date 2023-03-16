import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import vars from "../vars";

console.log(process.env)

function PaypalProvider({ children }) {
    return (
        <PayPalScriptProvider
            options={{
                "client-id": vars.PaypalClientID,
                currency: 'EUR',
                intent: 'capture',
                'enable-funding': ['sofort', 'giropay'],
                'disable-funding': ['card', 'sepa'],
            }}
        >
            {children}
        </PayPalScriptProvider>
    )
}

export {
    PaypalProvider
}
