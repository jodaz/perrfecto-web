import * as React from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogTitle from '../DialogTitle';
import TextInput from '../Forms/TextInput';
import SelectInput from '../Forms/SelectInput';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import {
    DOG_AGE,
    BREED,
    DOG_GENDER,
    DOG_TYPE,
    NAME,
    FEATURES,
    PHOTO
} from '../../validations';
import formDataHandler from '../../utils/formDataHandler';
import { apiProvider } from '../../api';
import { useAuth, renewToken } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import PhotoInput from '../Forms/PhotoInput';
import generateYears from '../../utils/generateYears';
import ChipArrayInput from '../Forms/ChipArrayInput';
import AddVaccines from '../../pages/Vaccines/AddVaccines';
import AddCertificates from '../../pages/certificates/AddCertificates';
import useEffectOnce from '../../utils/useEffectOnce'
import razas from '../../utils/breeds';
import generos from '../../utils/generos';

const types = [
    { value: "breed", label: "Raza" },
    { value: "mongrel", label: "Mestizo" },
    { value: "other", label: "Otro" }
];

const years = generateYears();

const RegisterDog = ({ open, handleClose, redirect = '?profile=true' }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [error, setError] = React.useState(false)
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const type = watch('type') ? watch('type').label : undefined;
    const { state: { user }, dispatch } = useAuth();
    const navigate = useNavigate();
    const [features, setFeatures] = React.useState([])

    const onSubmit = async data => {
        console.log(data)
        try {
            let {
                type,
                breed,
                gender,
                name,
                dogAge,
                files,
                characteristics,
                vaccines,
                certificates
            } = data;

            const mappedCharacteristics = characteristics.map(value => ({
                id_charact: value
            }))

            const parsedBreed = !breed ? 'mongrel' : typeof(breed) == 'string' ? breed : breed.label;

            const parsedData = {
                name: name,
                type: type.value,
                breed: parsedBreed,
                dogAge: dogAge.label,
                gender: gender.label,
                id_user: user.id,
                characteristics: mappedCharacteristics,
                files: files
            }

            if (vaccines) {
                const mappedVaccines = vaccines.map(({ id }) => ({
                    id_vaccine: id
                }))

                parsedData.vaccines = mappedVaccines
            }

            const formData = await formDataHandler(parsedData, 'files')

            if (certificates) {
                // Aqui va certificates en lugar de files
                for (let i = 0; i < certificates.length; i++) {
                    formData.append('certificates', certificates[i]);
                }
            }

            const res = await apiProvider.post('/api/dog/new', formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user);
                navigate(redirect)
            }
        } catch (error) {
            console.log(error)
            setError('Ha ocurrido un error inesperado.')
        }
    }

    const fetchFeatures = async () => {
        try {
            const res = await apiProvider.get('api/characteristic/characteristics')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setFeatures(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    useEffectOnce(() => { fetchFeatures() }, []);

    const generatePhotoProfile = (isSubmitting) => (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4
        }}>
            <Typography variant="h6" color="text.main" gutterBottom>
                Sube tu foto de perfil
            </Typography>
            <Box sx={{ p: 3 }}>
                <PhotoInput
                    name="files"
                    control={control}
                    disabled={isSubmitting}
                    rules={PHOTO.rules}
                    validations={PHOTO.messages}
                />
            </Box>
        </Box>
    )

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose} />
            <Box sx={{
                display: 'flex',
                minWidth: isSmall ? 'fit-content' : '400px',
                height: 'fit-content',
                p: 2,
                color: theme => theme.palette.text.secondary
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                {!isSmall && (
                    <>
                        <Box sx={{ flex: 1, p: 1 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: '500' }}>
                                Datos de tu perro
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Completa la siguiente información de tu
                                <br /> mascota para añadir al perfil.
                            </Typography>
                            {generatePhotoProfile(isSubmitting)}
                        </Box>
                        <Divider orientation="vertical" flexItem>o</Divider>
                    </>
                )}
                <Box sx={{ flex: 1 }}>
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
                    {(isSmall) && generatePhotoProfile(isSubmitting)}
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
                            noOptionsText='Sin resultados'
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
                                noOptionsText='Sin resultados'
                            />
                        </Box>
                    )}
                    {(type == 'Otro') && (
                        <Box sx={{ p: 2 }}>
                            <TextInput
                                label="Raza"
                                control={control}
                                name="breed"
                                type="text"
                                rules={NAME.rules}
                                validations={NAME.messages}
                                disabled={isSubmitting}
                                placeholder='Ingresar nombre de la raza'
                            />
                        </Box>
                    )}
                    <Box sx={{ p: 2 }}>
                        <SelectInput
                            label="Sexo"
                            control={control}
                            options={generos}
                            disabled={isSubmitting}
                            rules={DOG_GENDER.rules}
                            validations={DOG_GENDER.messages}
                            name="gender"
                            InputProps={{
                                placeholder: 'Seleccione el sexo'
                            }}
                            noOptionsText='Sin resultados'
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
                            }}
                            noOptionsText='Sin resultados'
                        />
                    </Box>
                    <Box sx={{
                        p: 2,
                        maxWidth: isSmall ? '280px' : '350px',
                    }}>
                        <ChipArrayInput
                            control={control}
                            name='characteristics'
                            labels={features}
                            rules={FEATURES.rules}
                            validations={FEATURES.messages}
                            disabled={isSubmitting}
                            label='Características de tu mascota'
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Añadir vacunas
                        </Typography>
                        <AddVaccines control={control} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Añadir certificados
                        </Typography>
                        <AddCertificates control={control} />
                    </Box>
                    <Box sx={{ p: 2 }}>
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

export default RegisterDog;
