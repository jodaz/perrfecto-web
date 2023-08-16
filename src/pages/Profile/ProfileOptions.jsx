import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinkBehavior from '../../components/LinkBehavior';
import {
    Settings,
    Star
} from 'lucide-react';

const ProfileOptions = () => (
    <Box sx={{
        display: 'flex',
        flex: 1,
        pt: 1,
        justifyContent: 'space-between'
    }}>
        <IconButton LinkComponent={LinkBehavior} to='/profile/settings'>
            <Settings />
        </IconButton>
        <IconButton LinkComponent={LinkBehavior} to='/profile/favourites'>
            <Star />
        </IconButton>
    </Box>
);

export default ProfileOptions
