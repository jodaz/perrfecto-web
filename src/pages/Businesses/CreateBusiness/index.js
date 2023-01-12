import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../../layouts/SettingsLayout';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const CreateBusiness = () => {
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
            }}>
                <Step1 />
                <Step2 />
                <Step3 />
            </Box>
        </SettingsLayout>
    );
}

export default CreateBusiness
