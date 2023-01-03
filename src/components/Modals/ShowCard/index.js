import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import InstagramModal from '../InstagramModal';
import { useMediaQuery } from '@mui/material';

const ShowCard = ({
    children,
    open,
    handleClose,
    photo,
    name,
    handleOpen
}) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <InstagramModal
            handleClose={handleClose}
            open={open}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                top: isSmall ? '-40px' : '-50px',
                left: 0,
                zIndex: 1000,
                color: '#fff'
            }} onClick={handleOpen}>
                <Avatar sx={{
                    width: isSmall ? '50px' : '70px',
                    height: isSmall ? '50px' : '70px',
                    marginRight: '1rem',
                    border: '2px solid #F59E0B'
                }} src={photo} />
                <Typography gutterBottom variant={isSmall ? 'body1' : "h5"} fontWeight={500}>
                    {name}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                minWidth: !isSmall ? 800 : '280px',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 4,
                marginRight: '1rem'
            }}>
                {children}
            </Box>
        </InstagramModal>
    );
}

export default ShowCard
