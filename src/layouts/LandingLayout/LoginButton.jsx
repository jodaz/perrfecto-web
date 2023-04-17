import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinkBehavior from '../../components/LinkBehavior';
// Icons
import { User } from 'lucide-react';

const LoginButton = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    if (matches) return (
        <IconButton
            variant="outlined"
            color='primary'
            to='/login'
            component={LinkBehavior}
        >
            <User />
        </IconButton>
    )

    return (
        <Button
            variant="outlined"
            color='primary'
            to='/login'
            component={LinkBehavior}
        >
            Iniciar sesión
        </Button>
    )
}

export default LoginButton;
