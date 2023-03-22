import * as React from 'react';
import Box from '@mui/material/Box';
import RefusedPayment from './RefusedPayment';
import SuccessfulPayment from './SuccessfulPayment';

const PaymentStatus = ({ isSmall, status }) => (
    <Box sx={{
        height: !isSmall ? '650px' : 'unset',
        display: 'flex',
        alignItems: 'center'
    }}>
        {(status == 'refused') && (
            <RefusedPayment />
        )}
        {(status == 'success') && (
            <SuccessfulPayment />
        )}
    </Box>
);

export default PaymentStatus
