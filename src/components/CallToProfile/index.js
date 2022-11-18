import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PupiRectangle from '../../assets/images/PupiRectangle.png'
import useMediaQuery from '@mui/material/useMediaQuery';

const CallToProfile = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box>
            <Box>
                <Button
                    variant="contained"
                >
                    Completar perfil
                </Button>
            </Box>
        </Box>
    );
}

export default CallToProfile;
