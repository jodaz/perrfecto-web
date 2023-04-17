import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinkBehavior from './LinkBehavior'
import { alpha } from '@mui/material';
import { ReactComponent as CheckIcon } from '../assets/icons/Check.svg'

const SuccessfulPayment = () => (
    <Box sx={{
        display: 'flex',
        p: 4,
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <CheckIcon />
        <Typography
            variant="subtitle1"
            color='success.main'
            fontWeight='500'
            fontSize='24px'
        >
            Pago realizado!
        </Typography>
        <Typography
            variant="subtitle1"
            color="text.secondary"
        >
            Tu pago para el plan premium se ha realizado exitosamente!
        </Typography>
        <Box sx={{ p: 2 }}>
            <Button
                component={LinkBehavior}
                to='/market'
                variant="outlined"
                sx={{
                    color: '#35414C',
                    borderColor: '#35414C',
                    '&:hover': {
                        borderColor: `${alpha('#35414C', 0.9)}`
                    }
                }}
            >
                Ir a home
            </Button>
        </Box>
    </Box>
);

export default SuccessfulPayment
