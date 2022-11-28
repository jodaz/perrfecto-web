import * as React from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogTitle from '../DialogTitle';
import TextInput from '../Forms/TextInput';
import SelectInput from '../Forms/SelectInput';
import { Calendar } from 'lucide-react'
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '../Forms/Checkbox';

const validations = {
    name: {
        required: "Ingrese el nombre de su perro"
    },
    type: {
        required: 'Seleccione un tipo de raza.'
    },
    gender: {
        required: 'Seleccione el género de su perro'
    },
    breed: {
        required: 'Seleccione la raza de su perro.'
    },
    dogAge: {
        required: 'Seleccione el año de nacimiento.'
    }
}

const razas = [
    { value: 1, label: "Bulldog Frances" },
    { value: 2, label: "PAstor aleman" },
    { value: 3, label: "Dalmata" }
];

const types = [
    { value: 1, label: "Raza" },
    { value: 2, label: "Mestizo" },
    { value: 3, label: "Otro" }
];

const genders = [
    { value: 1, label: "Macho" },
    { value: 2, label: "Hembra" }
];

const years = [
    { value: 1, label: "2020" },
    { value: 2, label: "2021" },
    { value: 3, label: "2022" }
];

const features = [
    'Hembra', 'Macho', 'Ambos', 'Pelaje oscuro', 'Pelaje claro',
    'Raza', 'Tamaño pequeño', 'Tamaño grande', 'Pelaje largo', 'Pelaje corto'
]

const RegisterDog = ({ open, handleClose }) => {
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
            <DialogTitle onClose={handleClose} />
            <Box sx={{
                display: 'flex',
                minWidth: '400px',
                height: 'fit-content',
                p: 2,
                color: theme => theme.palette.text.secondary,
                flexDirection: 'column'
            }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Datos de tu perro
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Completa la siguiente información de tu mascota para añadir al perfil.
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ flex: 1 }}>
                    <Box sx={{ p: 2 }}>
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
                    <Box sx={{ p: 2 }}>
                        <SelectInput
                            label="Raza"
                            control={control}
                            options={types}
                            validations={validations}
                            disabled={isSubmitting}
                            rules={{
                                required: true
                            }}
                            name="type"
                            InputProps={{
                                placeholder: 'Seleccione el tipo de raza'
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <SelectInput
                            label="Raza"
                            control={control}
                            options={razas}
                            validations={validations}
                            disabled={isSubmitting}
                            rules={{
                                required: true
                            }}
                            name="breed"
                            InputProps={{
                                placeholder: 'Seleccione la raza'
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <SelectInput
                            label="Sexo"
                            control={control}
                            options={genders}
                            disabled={isSubmitting}
                            validations={validations}
                            name="gender"
                            rules={{
                                required: true
                            }}
                            InputProps={{
                                placeholder: 'Seleccione el sexo'
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <SelectInput
                            label="Año de nacimiento"
                            control={control}
                            options={years}
                            validations={validations}
                            disabled={isSubmitting}
                            rules={{
                                required: true
                            }}
                            name="dogAge"
                            InputProps={{
                                placeholder: 'Seleccionar fecha',
                                startAdornment: <InputAdornment position="start"><Calendar /></InputAdornment>
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <FormControl>
                            <InputLabel color="divider" shrink>Características de tu mascota</InputLabel>
                            <Box sx={{
                                marginTop: '1rem',
                                display: 'flex',
                            }}>
                                {features.map(feature => (
                                    <Checkbox
                                        control={control}
                                        name={feature}
                                        icon={
                                            <Chip
                                                label={feature}
                                                variant="outlined"
                                                color="primary"
                                            />
                                        }
                                        checkedIcon={
                                            <Chip
                                                label={feature}
                                                variant='filled'
                                                color="primary"
                                            />
                                        }
                                    />
                                ))}
                            </Box>
                        </FormControl>
                    </Box>
                    <Button
                        disabled={isSubmitting}
                        variant="contained"
                        type="submit"
                    >
                        Siguiente
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}

export default RegisterDog;
