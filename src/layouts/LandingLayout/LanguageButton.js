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
        <Button variant="outlined" color="primary">
            <Globe />
            ESP
        </Button>
    )
}

export default LanguageButton;
