import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const countries = [
    { label: 'España', value: 'España' },
    { label: 'Venezuela', value: 'Venezuela' },
    { label: 'Chile', value: 'Chile' },
]

const AdVaccines = ({ control }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{ p: 2 }}>
                <Typography variant='h6' gutterBottom fontWeight={500} color="primary.main">
                    Vacunas
                </Typography>
            </Box>
        </Box>
    );
}

export default AdVaccines
