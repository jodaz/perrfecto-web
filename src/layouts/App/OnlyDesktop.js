import * as React from 'react';
import Box from '@mui/material/Box';
import Aside from './Aside'
import PawPrints from '../../assets/images/pawprints.svg'
// Screens
import { useMediaQuery } from '@mui/material';

export default function OnlyDesktop({ aside, principal }) {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: isSmall ? 'column' : 'row',
            height: '100%'
        }}>
            <Aside>
                {aside}
            </Aside>
            <Box
                component="main"
                sx={{
                    position: 'relative',
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    heigth: '100%',
                    width: isSmall ? '100%' : 'calc(100vw - 350px)',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    zIndex: 0,
                    '&:before': {
                        content: '""',
                        background: `url(${PawPrints}) center center fixed`,
                        backgroundSize: 'cover',
                        position: 'absolute',
                        bottom: 0,
                        height: '50%',
                        width: '100%',
                        zIndex: 0
                    }
                }}
            >
                <Box zIndex={10}>
                    {principal}
                </Box>
            </Box>
        </Box>
    );
}
