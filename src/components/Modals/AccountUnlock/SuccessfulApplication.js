import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactComponent as CheckCircle } from '../../../assets/icons/CheckCircle.svg'

const SuccessfulApplication = () => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        p: 2,
        width: '100%',
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
                Solicitud enviada
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                TinderDogs te contactará por medio de email informadote sobre tu situación
            </Typography>
        </Stack>
    </Box>
);

export default SuccessfulApplication
