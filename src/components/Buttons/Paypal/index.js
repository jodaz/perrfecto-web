import { PayPalButtons } from "@paypal/react-paypal-js";
import { apiProvider } from "../../../api";

const PaypalButton = ({ itemID }) => {

    const requestPayment = async () => {
        try {
            const res = await apiProvider.post(`/api/paypal/request-payment`, {
                pack_id: itemID
            })

            if (res.status >= 200 && res.status < 300) {
                console.log(res.data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const savePayment = async (data, actions) => {
        try {
            console.log(data);
            // const res = await apiProvider.get(`/api/paypal/execute-payment`, {
            //     params: {
            //         token: token,
            //         pack_id: itemID
            //     }
            // })

            // if (res.status >= 200 && res.status < 300) {
            //     console.log(res.data);
            // }
        } catch (error) {
            console.log("error ", error)
        }
    }

    return (
        <PayPalButtons
            createOrder={requestPayment}
            onCancel={(data) => console.log("compra cancelada")}
            onApprove={savePayment}
            style={{ layout: "horizontal", color: "blue" }}
        />
    )
}

export default PaypalButton
