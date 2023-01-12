import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const CreateBusiness = () => {
    const { control, watch, setValue } = useForm({
        defaultValues: {
            lat: 37.32485,
            lng: -5.934162
        }
    });

    return (
        <SettingsLayout title="Negocio">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <Step1 control={control} />
                <Step2 control={control} watch={watch} setValue={setValue} />
                <Step3 control={control} watch={watch} />
            </Box>
        </SettingsLayout>
    );
}

export default CreateBusiness
