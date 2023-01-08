import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import ProfileToolbar from '../../components/ProfileToolbar';

const SettingsLayout = ({ children, handleGoBack, title, ...rest }) => (
    <Slide direction="left" in={true}>
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }} {...rest}>
            <ProfileToolbar title={title} handleGoBack={handleGoBack} />
            {children}
        </Box>
    </Slide>
);

export default SettingsLayout
