import * as React from 'react'
import Box from '@mui/material/Box'
import LogoImage from '../assets/icons/logo.png'

const Logo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 900, fontSize: '1.15rem' }}>
        <img src={LogoImage} height='30px' width= '30px' />
        <Box sx={{ p: 1 }}>Tinderdogs</Box>
    </Box>
);

export default Logo;
