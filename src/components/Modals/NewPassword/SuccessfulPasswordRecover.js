import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { ReactComponent as CheckCircle } from '../../../assets/icons/CheckCircle.svg'

const SuccessfulPasswordRecover = ({ location }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center'
        }}>
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 5,
                textAlign: 'center'
            }}>
                <CheckCircle />
                <Typography color="text.primary" variant="h5" gutterBottom>
                    Cambio con éxito
                </Typography>
                <Typography color="text.secondary" variant="body1" gutterBottom>
                    El cambio de tu contraseña fue realizado con éxito
                </Typography>
            </Box>
        </Box>
    );
}

export default SuccessfulPasswordRecover
