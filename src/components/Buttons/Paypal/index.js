import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { apiProvider } from "../../../api";

const PaypalButton = ({ itemID, isSuscribing }) => {
    const navigate = useNavigate()

    const requestSuscriptionPayment = async () => {
        try {
            const res = await apiProvider.post(`/api/paypal/new-request-subscription`, {
                plan_id: itemID
            })

            if (res.status >= 200 && res.status < 300) {
                const { url } = res.data.data;

                const spplited = url.split('=')
                console.log(spplited[1])
                return spplited[1];
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const saveSuscriptionPayment = async () => {
        try {
            const res = await apiProvider.get(`/api/paypal/new-subscription`, {
                params: {
                    plan_id: itemID
                }
            })

            if (res.status >= 200 && res.status < 300) {
                navigate('?status=success')
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

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
        isSuscribing ? navigate('?status=refused') : navigate('checkout?status=refused')
    }

    return (
        <PayPalButtons
            createOrder={isSuscribing ? requestSuscriptionPayment : requestPayment}
            onCancel={handleRefusedRedirect}
            onApprove={isSuscribing ? saveSuscriptionPayment : savePayment}
            style={{ layout: "horizontal", color: "blue" }}
        />
    )
}

export default PaypalButton
