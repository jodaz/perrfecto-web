import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { apiProvider } from "../../../api";

const PaypalButton = ({ itemID }) => {
    const navigate = useNavigate()

    const requestPayment = async () => {
        try {
            const res = await apiProvider.post(`/api/paypal/request-payment`, {
                pack_id: itemID
            })

            if (res.status >= 200 && res.status < 300) {
                return res.data.data.id;
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const savePayment = async (data, actions) => {
        try {
            const { orderID } = data;

            const res = await apiProvider.get(`/api/paypal/execute-payment`, {
                params: {
                    token: orderID,
                    pack_id: itemID
                }
            })

            if (res.status >= 200 && res.status < 300) {
                navigate('checkout?status=success')
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const handleRefusedRedirect = () => {
        navigate('checkout?status=refused')
    }

    return (
        <PayPalButtons
            createOrder={requestPayment}
            onCancel={handleRefusedRedirect}
            onApprove={savePayment}
            style={{ layout: "horizontal", color: "blue" }}
        />
    )
}

export default PaypalButton
