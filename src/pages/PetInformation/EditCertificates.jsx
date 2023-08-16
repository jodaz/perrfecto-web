import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { fileProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import Button from '../../components/Button';
import AddCertificates from '../certificates/AddCertificates';

const EditCertificates = () => {
    const { state: { user }, dispatch } = useAuth();
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({
            'certificates': user.dog.Certificates
        }))
    });
    const navigate = useNavigate();

    const onSubmit = async ({ certificates }) => {
        const formData = new FormData();

        const keepedCertificates = certificates
            .filter(file => typeof(file) != 'string')
            .map(item => item.id)

        const deletedCertificates = user.dog.Certificates
            .filter(({ id }) => !keepedCertificates.includes(id))
            .map(item => ({ 'id_certificate': item.id }))

        if (certificates.length) {
            // Aqui va certificates en lugar de files
            for (let i = 0; i < certificates.length; i++) {
                formData.append('certificates', certificates[i][0]);
            }
        }

        if (deletedCertificates) {
            formData.append('certificates_delete', JSON.stringify(deletedCertificates))
        }

        try {
            const res = await fileProvider.put(`/api/dog/edit/${user.dog.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user);
                navigate(-1);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SettingsLayout title='Certificados'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box sx={{ p: 2 }}>
                        <AddCertificates control={control} />
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

export default EditCertificates
