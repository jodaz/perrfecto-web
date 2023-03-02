import React, { cloneElement } from 'react'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PaymentMethodButton = ({
    icon,
    title
}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <IconButton>
                <img src={icon} />
            </IconButton>
            <Typography variant="body2" fontWeight={500} color="text.secondary">
                {title}
            </Typography>
        </Box>
    )
}

export default PaymentMethodButton
