import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import ProfileToolbar from '../../components/ProfileToolbar';

const Favourites = ({ children, title }) => (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <ProfileToolbar title='Favoritos' />
            {children}
        </Box>
    </Slide>
);

export default Favourites
