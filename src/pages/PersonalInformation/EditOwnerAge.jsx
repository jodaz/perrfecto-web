import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '../../components/Button';
import { useAuth, renewToken } from '../../context/AuthContext';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { fileProvider } from '../../api';
import { useNavigate } from 'react-router-dom';
import formDataHandler from '../../utils/formDataHandler';
import { DATE_BIRTH } from '../../validations'
import DateInput from '../../components/Forms/DateInput';

const EditOwnerAge = () => {
    const { state: { user }, dispatch } = useAuth();
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            birth_date: user.birth_date ? new Date (user.birth_date.toString().replace(/"/g, '')) : undefined
        }
    });
    const navigate = useNavigate();

    const onSubmit = async values => {
        try {
            const formData = await formDataHandler(values)
            const res = await fileProvider.put(`/api/auth/user-edit/${user.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
                navigate(-1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SettingsLayout title='Edad'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}  component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box sx={{ p: 2, display: 'flex' }}>
                        <DateInput
                            control={control}
                            name='birth_date'
                            label="Edad"
                            placeholder='Ingrese su nombre'
                            rules={DATE_BIRTH.rules}
                            validations={DATE_BIRTH.messages}
                            disabled={isSubmitting}
                        />
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default EditOwnerAge
