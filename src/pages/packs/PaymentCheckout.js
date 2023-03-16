import * as React from 'react';
import Box from '@mui/material/Box';
import SuccessfulPayment from './SuccessfulPayment';
import RefusedPayment from './RefusedPayment';
import getSearchParams from '../../utils/getSearchParams';

const PaymentCheckout = ({ location }) => {
    const status = getSearchParams(location, 'status')

    if (status == 'success') {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%'
            }}>
                <SuccessfulPayment />
            </Box>
        )
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%'
        }}>
            <RefusedPayment />
        </Box>
    );
}

export default PaymentCheckout
