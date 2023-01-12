import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../../layouts/SettingsLayout';
import { Outlet } from 'react-router-dom';

const CreateBusiness = () => (
    <SettingsLayout title="Negocio">
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <Outlet />
        </Box>
    </SettingsLayout>
);

export default CreateBusiness
