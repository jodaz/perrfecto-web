import * as React from 'react'
import Box from '@mui/material/Box'
import LogoImage from '../assets/icons/logo.png'
import Typography from '@mui/material/Typography';

const Logo = ({
    color = 'secondary.main'
}) => (
    <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 900, fontSize: '1.15rem' }}>
        <img src={LogoImage} height='30px' width= '30px' />
        <Typography sx={{ p: 1 }} color={color}>Tinderdogs</Typography>
    </Box>
);

export default Logo;
