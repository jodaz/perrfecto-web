import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft } from 'lucide-react';

const ProfileToolbar = ({ title, handleGoBack }) => {
    const navigate = useNavigate();

    return (
        <Box width='100%'>
            <Toolbar sx={{
                width: '100%',
                p: '0 !important',
                minHeight: '56px !important',
                boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.12)'
            }}>
                <Box>
                    <IconButton onClick={handleGoBack ? handleGoBack : () => navigate(-1)}>
                        <ChevronLeft />
                    </IconButton>
                </Box>
                <Box sx={{ fontWeight: 500, flex: 1, textAlign: 'center' }}>
                    {title}
                </Box>
            </Toolbar>
            <Divider />
        </Box>
    );
}

export default ProfileToolbar
