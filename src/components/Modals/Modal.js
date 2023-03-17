import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import DialogTitle from '../DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Modal({ location, title, pathname, children }) {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()

    const handleClose = () => navigate(-1)

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == pathname}
        >
            <DialogTitle onClose={handleClose} />
            <Box sx={{
                m: 1,
                display: 'flex',
                width: isSmall ? 'fit-content' : '400px',
                height: 'fit-content',
                p: 3,
                color: theme => theme.palette.text.secondary
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box component='h2' margin='0 0 1rem 0' color="text.primary">
                        {title}
                    </Box>
                    {children}
                </Box>
            </Box>
        </Dialog>
    );
}
