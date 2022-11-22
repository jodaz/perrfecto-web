import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
// Icons
import { ReactComponent as WorldIcon } from '../../assets/icons/World.svg'

const LanguageButton = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    if (matches) return (
        <IconButton>
            <WorldIcon />
        </IconButton>
    )

    return (
        <Button variant="contained" color="secondary">
            <WorldIcon />
            Español
        </Button>
    )
}

export default LanguageButton;
