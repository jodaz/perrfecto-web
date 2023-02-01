import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextInput from '../../../components/Forms/TextInput';
import {
    PROVINCE,
    CITY,
    BUSINESS_ADDRESS
} from '../../../validations';
import { useForm } from 'react-hook-form';
import SelectInput from '../../../components/Forms/SelectInput';
import provincias from '../../../utils/provincias'
import ciudades from '../../../utils/ciudades'
import MapInput from '../../../components/Forms/MapInput';
import { saveStep, useMultiStepForm } from '../../../context/MultiStepContext';
import { useNavigate } from 'react-router-dom';
import Stepper from '../Stepper';
import { useAuth } from '../../../context/AuthContext';

const selectedProvince = name => provincias.find(({ nombre }) => nombre === name)
const selectedCity = name => ciudades.find(({ nombre }) => nombre === name)

const EditBusinessStep2 = () => {
    const navigate = useNavigate()
    const { dispatch } = useMultiStepForm();
    const { state: { user } } = useAuth();
    const {
        control,
        watch,
        setValue,
        handleSubmit,
    } = useForm({
        defaultValues: React.useMemo(() => ({
            lat: user.publication.lat,
            business_dir: user.publication.business_dir,
            leng: user.publication.leng,
            province: selectedProvince(user.publication.province),
            city: selectedCity(user.publication.city)
        }))
    });
    const [cities, setCities] = React.useState([])
    const province = watch('province')

    const onSubmit = data => {
        const { province, city, ...restData } = data;

        saveStep(dispatch, {
            ...restData,
            province: province.nombre,
            city: city.nombre
        });

        navigate('/businesses/edit/step-3')
    }

    React.useEffect(() => {
        if (province) {
            const filteredCities = ciudades
                .filter(({ id_provincia }) => id_provincia == province.id)

            setCities(filteredCities)
        }
    }, [province])

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stepper title='PASO 2' type='edit' />
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                >
                    Ingresar información sobre el lugar
                </Typography>
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='business_dir'
                    label='Dirección'
                    rules={BUSINESS_ADDRESS.rules}
                    validations={BUSINESS_ADDRESS.messages}
                    placeholder='Ingrese una dirección'
                />
            </Box>
            <Box p={2}>
                <SelectInput
                    control={control}
                    name="province"
                    label='Provincia'
                    options={provincias}
                    optionLabel='nombre'
                    rules={PROVINCE.rules}
                    validations={PROVINCE.messages}
                    InputProps={{
                        placeholder: 'Seleccione una provincia'
                    }}
                    noOptionsText='Sin resultados'
                />
            </Box>
            <Box p={2}>
                <SelectInput
                    control={control}
                    name="city"
                    label='Ciudad'
                    options={cities}
                    optionLabel='nombre'
                    rules={CITY.rules}
                    validations={CITY.messages}
                    InputProps={{
                        placeholder: 'Seleccione una ciudad'
                    }}
                    noOptionsText='Sin resultados'
                />
            </Box>
            <Box sx={{
                height: 'fit-content',
                flex: 1
            }} p={2}>
                <MapInput control={control} watch={watch} setValue={setValue} />
            </Box>
            <Box sx={{ p: 2 }}>
                <Button
                    variant='contained'
                    type='submit'
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    );
}

export default EditBusinessStep2
