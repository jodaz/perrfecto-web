import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const CreateBusiness = () => {
    const {
        control,
        watch,
        setValue,
        handleSubmit,
        formState: {
            isSubmitting
        }
    } = useForm({
        defaultValues: {
            lat: 37.32485,
            lng: -5.934162
        }
    });

    const onSubmit = async data => {
        console.log(data)
        // setOpenOverlayLoader(true)
        // const formData = await formDataHandler(data, 'files')

        // try {
        //     const res = await fileProvider.post('/api/publication/new', formData)

        //     if (res.status >= 200 && res.status < 300) {
        //         renewToken(dispatch, user)
        //         setOpenWarning(true)
        //         setOpenOverlayLoader(false)
        //     }
        // } catch (error) {
        //     setOpenOverlayLoader(false)
        //     console.log(error)
        // }
    };

    return (
        <SettingsLayout title="Negocio">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }} component='form' onSubmit={handleSubmit(onSubmit)}>
                <Step1 control={control} />
                <Step2 control={control} watch={watch} setValue={setValue} />
                <Step3 control={control} watch={watch} />
            </Box>
        </SettingsLayout>
    );
}

export default CreateBusiness
