import * as React from 'react';
import Box from '@mui/material/Box';
import InstagramModal from '../InstagramModal';
import { useMediaQuery } from '@mui/material';

const ShowCard = ({ children, open, handleClose }) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <InstagramModal
            onClose={handleClose}
            open={open}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                p: 2,
                minWidth: !isSmall ? 800 : '280px',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 4,
                marginRight: '1rem'
            }}>
                <Box sx={{ flex: 1 }}>

                </Box>
                <Box sx={{
                    flex: 1,
                    p: 2
                }}>
                    {children}
                </Box>
            </Box>
        </InstagramModal>
    );
}

export default ShowCard
