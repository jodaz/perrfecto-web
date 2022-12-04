import * as React from 'react'
import Box from '@mui/material/Box'
import LogoImage from '../assets/icons/logo.png'

const Logo = () => (
    <Box sx={{ display: 'flex', color: '#fff', fontWeight: 900, fontSize: '1.15rem' }}>
        <img src={LogoImage} height='40px' width= '40px' />
        <Box sx={{ p: 2 }}>Tinderdogs</Box>
    </Box>
);

export default Logo;
