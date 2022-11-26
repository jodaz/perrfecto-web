import * as React from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogTitle from '../DialogTitle';
import Divider from '@mui/material/Divider';
import PhotoInput from '../Forms/PhotoInput';
import DateInput from '../Forms/DateInput';
import formDataHandler from '../../utils/formDataHandler';
import { fileProvider } from '../../api'
import { useAuth } from '../../context/AuthContext';

const validations = {
    date_birth: {
        required: "Ingrese su fecha de nacimiento."
    },
    files: {
        required: 'Seleccione una imagen.'
    }
}

const rules = {
    date_birth: {
        required: true
    },
    files: {
        required: true
    }
}

const RegisterOwner = ({ open, handleClose }) => {
    const [error, setError] = React.useState(false)
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const { state: { user } } = useAuth();

    const onSubmit = async (data) => {
        const formData = await formDataHandler(data, 'files')

        const res = await fileProvider.put(`/api/auth/user-edit/${user.id}`, formData)
            .catch(error => {
            if (error.response.status == 401) {
                setError(true)
            }
        });

        if (res.status >= 200 && res.status < 300) {
            const { data } = res;

            handleClose();
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose} />
            <Box sx={{
                display: 'flex',
                width: '800px',
                height: 'fit-content',
                p: 2,
                color: theme => theme.palette.text.secondary
            }}>
                <Box sx={{ flex: 1, p: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Datos del propietario
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Completa la siguiente información personal para añadir a tu perfil.
                    </Typography>
                </Box>
                <Divider orientation="vertical" flexItem>o</Divider>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', p: 2 }}>
                        <Box width='200px' textAlign='center'>
                            <Typography variant="h6" color="text.main" gutterBottom>
                                Sube tu foto de perfil
                            </Typography>
                            <Typography variant="body2" color="text.main" gutterBottom>
                                Esta foto será visible para todos los usuarios
                            </Typography>
                        </Box>
                        <Box sx={{ p: 3 }}>
                            <PhotoInput
                                name="files"
                                control={control}
                                disabled={isSubmitting}
                                rules={rules.files}
                                validations={validations}
                            />
                        </Box>
                        <Box sx={{ p: 3 }}>
                            <DateInput
                                name='date_birth'
                                control={control}
                                disabled={isSubmitting}
                                rules={rules.date_birth}
                                validations={validations}
                                label='Fecha de cumpleaños'
                            />
                        </Box>
                        <Button
                            disabled={isSubmitting}
                            variant="contained"
                            type="submit"
                            fullWidth
                        >
                            Siguiente
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}

export default RegisterOwner;
