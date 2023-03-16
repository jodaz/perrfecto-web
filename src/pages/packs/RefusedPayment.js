import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinkBehavior from '../../components/LinkBehavior'
import { alpha } from '@mui/material';
import { ReactComponent as RefusedIcon } from '../../assets/icons/Refused.svg'

const RefusedPayment = () => (
    <Box sx={{
        display: 'flex',
        p: 4,
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <RefusedIcon />
        <Typography
            variant="subtitle1"
            color='error.main'
            fontWeight='500'
            fontSize='24px'
        >
            Pago rechazado
        </Typography>
        <Typography
            variant="subtitle1"
            color="text.secondary"
        >
            Tu pago no se pudo realizar, por favor vuelve a intentar.
        </Typography>
        <Box sx={{ p: 2 }}>
            <Button
                component={LinkBehavior}
                to={-2}
                variant="outlined"
                sx={{
                    color: '#35414C',
                    borderColor: '#35414C',
                    '&:hover': {
                        borderColor: `${alpha('#35414C', 0.9)}`
                    }
                }}
            >
                Volver a intentar
            </Button>
        </Box>
    </Box>
);

export default RefusedPayment
