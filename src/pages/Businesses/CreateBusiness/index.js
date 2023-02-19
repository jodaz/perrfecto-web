import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../../layouts/SettingsLayout';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { saveStep, useMultiStepForm } from '../../../context/MultiStepContext';

const CreateBusiness = () => {
    const { state: { user } } = useAuth();
    const { dispatch } = useMultiStepForm()

    React.useEffect(() => {
        if (user) {
            saveStep(dispatch, {
                code_phone: user.code_phone,
                business_name: user.business_name,
                whatsApp: user.phone,
                business_dir: user.business_dir,
                email: user.email
            });
        }
    }, [user])

    return (
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
}

export default CreateBusiness
