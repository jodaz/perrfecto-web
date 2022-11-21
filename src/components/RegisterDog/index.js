import * as React from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogTitle from '../DialogTitle';
import TextInput from '../Forms/TextInput';
import SelectInput from '../Forms/SelectInput';

const validations = {
    name: {
        required: "Ingrese el nombre de su perro"
    }
}

const razas = [
    { value: 1, label: "Bulldog Frances" },
    { value: 2, label: "PAstor aleman" },
    { value: 3, label: "Dalmata" }
];

const sexos = [
    { value: 1, label: "Macho" },
    { value: 2, label: "Hembra" }
];

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
                        <Box sx={{ p: 1 }}>
                            <SelectInput
                                label="Raza"
                                control={control}
                                options={razas}
                                disabled={isSubmitting}
                                name="race"
                                InputProps={{
                                    placeholder: 'Seleccione la raza'
                                }}
                            />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <SelectInput
                                label="Sexo"
                                control={control}
                                options={sexos}
                                disabled={isSubmitting}
                                name="genre"
                                InputProps={{
                                    placeholder: 'Seleccione el sexo'
                                }}
                            />
                        </Box>
                        <Button disabled={isSubmitting} variant="contained" type="submit">
                            Siguiente
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}

export default RegisterDog;
