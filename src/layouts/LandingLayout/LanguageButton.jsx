import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
// Icons
import { Globe } from 'lucide-react';

const LanguageButton = ({ dark }) => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    if (matches) return (
        <IconButton color="primary">
            <Globe />
        </IconButton>
    )

    return (
        <Button sx={{
            color: theme => theme.palette.primary.main,
            backgroundColor: dark ? 'rgba(0, 0, 0, 0.06)' : 'transparent'
        }}>
            <Globe />
            ESP
        </Button>
    )
}

export default LanguageButton;
