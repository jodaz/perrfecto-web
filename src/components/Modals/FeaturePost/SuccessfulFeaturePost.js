import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactComponent as CheckCircle } from '../../../assets/icons/CheckCircle.svg'

const SuccessfulFeaturePost = ({ handleClose }) => (
    <Box sx={{
        flex: 1,
        display: 'flex',
        background: '#fff',
        alignItems: 'center',
        width: 300,
        borderRadius: 4,
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
                Publicación destacada
            </Typography>
            <Typography color="text.secondary" textAlign='center' variant="body1" gutterBottom>
                Tu publicación en TinderDogs se ha destacado con éxito
            </Typography>
            <Button onClick={handleClose}>Ok</Button>
        </Box>
    </Box>
);

export default SuccessfulFeaturePost
