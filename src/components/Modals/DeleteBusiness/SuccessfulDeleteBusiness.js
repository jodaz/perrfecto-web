import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinkBehavior from '../../LinkBehavior'
import Typography from '@mui/material/Typography';
import { ReactComponent as CheckCircle } from '../../../assets/icons/CheckCircle.svg'

const SuccessfulDeleteBusiness = ({ handleClose }) => (
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
                Negocio eliminado
            </Typography>
            <Typography color="text.secondary" textAlign='center' variant="body1" gutterBottom>
                Tu negocios en TinderDogs se ha eliminado con éxito
            </Typography>
            <Button onClick={handleClose}>Ok</Button>
        </Box>
    </Box>
);

export default SuccessfulDeleteBusiness
