import * as React from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogTitle from '../DialogTitle';
import TextInput from '../Forms/TextInput';

const validations = {
    name: {
        required: "Ingrese el nombre de su perro"
    }
}

const RegisterDog = (open, handleClose) => {
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = async (data) => {
        console.log(data)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>
                <Box sx={{ pl: 2 }}>
                    Datos de tu perro
                </Box>
            </DialogTitle>
            <Box sx={{
                m: 1,
                display: 'flex',
                minWidth: '400px',
                height: 'fit-content',
                p: 3,
                color: theme => theme.palette.text.secondary
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                            Completa la siguiente información de tu mascota para añadir al perfil.
                        </Typography>
                        <Box sx={{ p: 1 }}>
                            <TextInput
                                label="Nombre"
                                control={control}
                                name="name"
                                type="text"
                                rules={{
                                    required: true
                                }}
                                validations={validations}
                                disabled={isSubmitting}
                                placeholder='Ingresar nombre de tu perro'
                            />
                        </Box>
                        <Button disabled={isSubmitting} variant="contained">
                            Siguiente
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}

export default RegisterDog;
