import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../../layouts/SettingsLayout';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { saveStep, useMultiStepForm } from '../../../context/MultiStepContext';
import { apiProvider } from '../../../api';
import useEffectOnce from '../../../utils/useEffectOnce';

const EditBusiness = () => {
    const { state: { user } } = useAuth()
    const { dispatch } = useMultiStepForm()

    const fetchBusiness = async () => {
        try {
            const res = await apiProvider.get(`/api/business-ann/business/${user.publication.id}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                const {
                    AnnMultimedia,
                    ...restData
                } = data;

                saveStep(dispatch, {
                    files: AnnMultimedia.map(item => item.name),
                    ...restData
                })
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    useEffectOnce(() => {
        if (user.publication) {
            fetchBusiness()
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
