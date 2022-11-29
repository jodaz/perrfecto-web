import * as React from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import DialogTitle from '../DialogTitle';
import Checkbox from '../Forms/Checkbox';
import TextInput from '../Forms/TextInput';
import SelectInput from '../Forms/SelectInput';
import { Calendar } from 'lucide-react'
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import {
    DOG_AGE,
    BREED,
    DOG_GENDER,
    DOG_TYPE,
    NAME
} from '../../validations';
import formDataHandler from '../../utils/formDataHandler';
import { apiProvider } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

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
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [error, setError] = React.useState(false)
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const type = watch('type') ? watch('type').label : undefined;
    const { state: { user } } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let {
                type,
                breed,
                gender,
                name,
                dogAge,
                ...features
            } = data;
            // Convert features object to array before sending
            const elements = Object.entries(features).filter((feature) => {
                if (feature[1]) return feature[0]
            }).map(item => item[0])

            const parsedData = {
                name: name,
                type: type.label,
                breed: breed.label,
                dogAge: dogAge.label,
                gender: gender.label,
                user_id: user.id,
                features: elements
            }

            const formData = await formDataHandler(parsedData)

            const res = await apiProvider.post('/api/dog/new', formData)

            if (res.status >= 200 && res.status < 300) {
                navigate('?profile=true')
            }
        } catch (error) {
            setError('Ha ocurrido un error inesperado.')
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose} />
            <Box sx={{
                display: 'flex',
                minWidth: isSmall ? 'fit-content' : '400px',
                height: 'fit-content',
                p: 2,
                color: theme => theme.palette.text.secondary
            }}>
                {!isSmall && (
                    <>
                        <Box sx={{ flex: 1, p: 2 }}>
                            <Typography variant="h4" gutterBottom>
                                Datos de tu perro
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Completa la siguiente información de tu mascota para añadir al perfil.
                            </Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem>o</Divider>
                    </>
                )}
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    {(isSmall) && (
                        <Box mb={4}>
                            <Typography variant="h6" gutterBottom>
                                Datos de tu perro
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Completa la siguiente información de tu mascota para añadir al perfil.
                            </Typography>
                        </Box>
                    )}
                    {(error) && (
                        <Alert severity="error" sx={{ marginBottom: '1.5rem' }}>
                            {error}
                        </Alert>
                    )}
                    <Box sx={{ p: 2 }}>
                        <TextInput
                            label="Nombre"
                            control={control}
                            name="name"
                            type="text"
                            rules={NAME.rules}
                            validations={NAME.messages}
                            disabled={isSubmitting}
                            placeholder='Ingresar nombre de tu perro'
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <SelectInput
                            label="Tipo"
                            control={control}
                            options={types}
                            validations={DOG_TYPE.messages}
                            disabled={isSubmitting}
                            rules={DOG_TYPE.rules}
                            name="type"
                            InputProps={{
                                placeholder: 'Seleccione el tipo de raza'
                            }}
                        />
                    </Box>
                    {(type == 'Raza') && (
                        <Box sx={{ p: 2 }}>
                            <SelectInput
                                label="Raza"
                                control={control}
                                options={razas}
                                validations={BREED.messages}
                                disabled={isSubmitting}
                                rules={BREED.rules}
                                name="breed"
                                InputProps={{
                                    placeholder: 'Seleccione la raza'
                                }}
                            />
                        </Box>
                    )}
                    <Box sx={{ p: 2 }}>
                        <SelectInput
                            label="Sexo"
                            control={control}
                            options={genders}
                            disabled={isSubmitting}
                            rules={DOG_GENDER.rules}
                            validations={DOG_GENDER.messages}
                            name="gender"
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
                            rules={DOG_AGE.rules}
                            validations={DOG_AGE.messages}
                            disabled={isSubmitting}
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
                                width: '200px'
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
