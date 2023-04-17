import * as React from 'react';
import Box from '@mui/material/Box';
import getSearchParams from '../../utils/getSearchParams';
import PaymentStatus from '../../components/PaymentStatus'
import { useMediaQuery } from '@mui/material';
import PaymentCheckoutForm from '../../components/Forms/PaymentCheckoutForm';

const PaymentCheckout = ({ location }) => {
    const status = getSearchParams(location, 'status')
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {status ? (
                <PaymentStatus isSmall={isSmall} status={status} />
            ) : <PaymentCheckoutForm />}
        </Box>
    );
}

export default PaymentCheckout
