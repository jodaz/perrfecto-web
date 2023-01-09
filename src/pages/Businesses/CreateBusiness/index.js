import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const CreateBusiness = () => {
    const { control, watch } = useForm();

    return (
        <SettingsLayout title="Negocio">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <Step1 control={control} />
                <Step2 control={control} watch={watch} />
                <Step3 control={control} />
            </Box>
        </SettingsLayout>
    );
}

export default CreateBusiness
