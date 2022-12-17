import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import { X } from 'lucide-react';
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const InstagramModal = ({ open, handleClose, children }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClick={handleClose}
        >
            <Box sx={{
                display: 'flex',
                width: 'fit-content',
                height: 'fit-content',
                position: 'relative'
            }}>
                {children}
                <Box sx={{
                    position: 'absolute',
                    top: isSmall ? '-50px' : 0,
                    right: isSmall ? 0 : '-100px'
                }}>
                    <IconButton color='secondary'>
                        <X size={32} />
                    </IconButton>
                </Box>
            </Box>
        </Backdrop>
    );
}

export default InstagramModal
