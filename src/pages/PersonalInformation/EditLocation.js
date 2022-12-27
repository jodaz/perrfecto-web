import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import SelectInput from '../../components/Forms/SelectInput';
import { PROVINCE, CITY } from '../../validations';
import { fileProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import formDataHandler from '../../utils/formDataHandler';
import provincias from '../../utils/provincias';
import Button from '../../components/Button';
import dirtyCities from '../../utils/ciudades';

const selectedProvince = name => provincias.find(({ nombre }) => nombre === name)
const selectedCity = name => dirtyCities.find(({ nombre }) => nombre === name)

const EditLocation = () => {
    const { state: { user }, dispatch } = useAuth();
    const { control, handleSubmit, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({
            'province': selectedProvince(user.province),
            'city': selectedCity(user.city)
        }))
    });
    const [cities, setCities] = React.useState([])
    const navigate = useNavigate();
    const province = watch('province')

    const onSubmit = async values => {
        try {
            let {
                province,
                city,
                ...rest
            } = values;

            const data = {
                province: province.nombre,
                city: city.nombre,
                ...rest
            };

            const formData = await formDataHandler(data)
            const res = await fileProvider.put(`/api/auth/user-edit/${user.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user);
                navigate(-1);
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        if (province) {
            const filteredCities = dirtyCities
                .filter(({ id_provincia }) => id_provincia == province.id)

            setCities(filteredCities)
        }
    }, [province])

    return (
        <SettingsLayout title='Ubicación'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom fontWeight={500}>
                            ¿Dónde vives?
                        </Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <SelectInput
                            name='province'
                            control={control}
                            disabled={isSubmitting}
                            label='Ciudad, estado o provincia'
                            options={provincias}
                            optionLabel='nombre'
                            rules={PROVINCE.rules}
                            validations={PROVINCE.messages}
                            InputProps={{
                                placeholder: 'Seleccione una provincia'
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <SelectInput
                            name='city'
                            control={control}
                            disabled={isSubmitting}
                            label='Distrito'
                            options={cities}
                            optionLabel='nombre'
                            // rules={CITY.rules}
                            // validations={CITY.messages}
                            InputProps={{
                                placeholder: 'Seleccione una ciudad'
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant='body2' gutterBottom>
                            *Esta información solo servirá para mostrarte a personas potenciales por medio de filtros
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        Enviar
                    </Button>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default EditLocation
