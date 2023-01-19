import * as React from 'react'
import Box from '@mui/material/Box'
import { ReactComponent as LogoSvg } from '../assets/icons/Logo.svg'
import Typography from '@mui/material/Typography';

const Logo = ({
    color = 'secondary.main',
    height = '30px',
    width = '30px'
}) => (
    <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 900, fontSize: '1.15rem' }}>
        <LogoSvg />
    </Box>
);

export default Logo;
