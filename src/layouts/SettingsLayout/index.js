import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import ProfileToolbar from '../../components/ProfileToolbar';

const SettingsLayout = ({ children, title }) => (
    <Slide direction="left" in={true}>
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <ProfileToolbar title={title} />
            {children}
        </Box>
    </Slide>
);

export default SettingsLayout
