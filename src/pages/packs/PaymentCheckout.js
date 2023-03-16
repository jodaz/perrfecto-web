import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../layouts/SettingsLayout';
import useEffectOnce from '../../utils/useEffectOnce';
import {
    useBusinesses,
    fetchByCategory,
    resetFilters
} from '../../context/BusinessContext';
import { apiProvider } from '../../api';
import SuccessfulPayment from './SuccessfulPayment';
import getSearchParams from '../../utils/getSearchParams';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';

const PaymentCheckout = ({ location }) => {
    const { id } = useParams()
    const status = getSearchParams(location, 'status')
    const token = getSearchParams(location, 'token')
    const PayerID = getSearchParams(location, 'PayerID')
    const [isLoading, setIsLoading] = React.useState(false);

    const sendPayment = async () => {
        setIsLoading(true)

        try {
            const res = await apiProvider.get(`/api/paypal/execute-payment`, {
                params: {
                    token: token,
                    pack_id: id
                }
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

    React.useEffect(() => {
        if (status == 'success') {
            sendPayment()
        }
    }, [status])

    return (
        <SettingsLayout title='Pack de anuncios'>
            {isLoading ? (
                <LoadingIndicator height='100%' />
            ) : <SuccessfulPayment />}
        </SettingsLayout>
    )
}

export default PaymentCheckout
