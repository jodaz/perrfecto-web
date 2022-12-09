import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
// Icons
import { Globe } from 'lucide-react';

const LanguageButton = ({ dark }) => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    if (matches) return (
        <IconButton>
            <Globe color={dark ? '#000' : '#fff'} />
        </IconButton>
    )

    return (
        <Button variant="contained" color="secondary" sx={{
            background: 'rgba(255, 255, 255, 0.12)',
            color: dark ? '#000' : '#fff'
        }}>
            <Globe />
            Español
        </Button>
    )
}

export default LanguageButton;
