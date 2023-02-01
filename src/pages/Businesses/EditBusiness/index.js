import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../../layouts/SettingsLayout';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { saveStep, useMultiStepForm } from '../../../context/MultiStepContext';

const EditBusiness = () => {
    const { state: { user } } = useAuth()
    const { dispatch } = useMultiStepForm()

    React.useEffect(() => {
        if (user.publication) {
            const {
                AnnMultimedia,
                ...restPublication
            } = user.publication;

            saveStep(dispatch, {
                files: AnnMultimedia.map(item => item.name),
                ...restPublication
            })
        }
    }, [])

    if (!user.publication) return <Navigate to="/businesses" />

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

export default EditBusiness
