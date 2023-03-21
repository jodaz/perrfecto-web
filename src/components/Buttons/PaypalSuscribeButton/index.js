import { PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";
import { apiProvider } from "../../../api";

const PaypalSuscribeButton = ({ itemID }) => {
    const navigate = useNavigate()
    const location = useLocation();

    const requestSuscriptionPayment = async () => {
        try {
            const res = await apiProvider.post(`/api/paypal/new-request-subscription`, {
                plan_id: itemID
            })

            if (res.status >= 200 && res.status < 300) {
                return res.data.data.id;
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const saveSuscriptionPayment = async () => {
        try {
            const res = await apiProvider.post(`/api/paypal/new-subscription`, {
                plan_id: itemID
            })

            if (res.status >= 200 && res.status < 300) {
                navigate('checkout?status=success', {
                    state: location.state
                })
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const handleRefusedRedirect = () => {
        navigate('checkout?status=refused', {
            state: location.state
        })
    }

    return (
        <PayPalButtons
            createSubscription={requestSuscriptionPayment}
            onCancel={handleRefusedRedirect}
            onApprove={saveSuscriptionPayment}
            style={{ layout: "horizontal", color: "blue" }}
        />
    )
}

export default PaypalSuscribeButton
