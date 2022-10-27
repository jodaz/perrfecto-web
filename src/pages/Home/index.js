import * as React from 'react';
import Box from '@mui/material/Box';
import Aside from './Aside'

export default function Home() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Aside />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >

            </Box>
        </Box>
    );
}
