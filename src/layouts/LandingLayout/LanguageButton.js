import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
// Icons
import { Globe } from 'lucide-react';

const LanguageButton = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    if (matches) return (
        <IconButton>
            <Globe />
        </IconButton>
    )

    return (
        <Button variant="contained" color="secondary">
            <Globe />
            Español
        </Button>
    )
}

export default LanguageButton;
