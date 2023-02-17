import * as React from 'react';
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactComponent as CheckCircle } from '../../../assets/icons/CheckCircle.svg'

const SuccessfulReport = ({ item, handleClose }) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        p: 2,
        maxWidth: '280px',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 4,
        marginRight: '1rem',
        textAlign: 'center',
        color: theme => theme.palette.text.secondary,
    }}>
        <Stack
            orientation='column'
            spacing={1}
            alignItems='center'
        >
            <CheckCircle />
            <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                Reporte enviado
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                El reporte de "{item.receptor.user.name}" se ha enviado con éxito
            </Typography>
            <MuiButton onClick={handleClose}>
                Ok
            </MuiButton>
        </Stack>
    </Box>
);

export default SuccessfulReport
