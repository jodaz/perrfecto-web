import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextInput from '../../../components/Forms/TextInput';
import {
    PROVINCE,
    CITY,
    BUSINESS_ADDRESS
} from '../../../validations';
import SelectInput from '../../../components/Forms/SelectInput';
import provincias from '../../../utils/provincias'
import ciudades from '../../../utils/ciudades'

const categories = [
    {
        value: 'store', label: 'Tienda de mascotas'
    }
]

const Step2 = ({ control, watch }) => {
    const [cities, setCities] = React.useState([])
    const province = watch('province')

    React.useEffect(() => {
        if (province) {
            const filteredCities = ciudades
                .filter(({ id_provincia }) => id_provincia == province.id)

            setCities(filteredCities)
        }
    }, [province])

    return (
        <Box>
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight={500}
                >
                    PASO 2
                </Typography>
            </Box>
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
                    name='address'
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
                    InputProps={{
                        placeholder: 'Seleccione una provincia'
                    }}
                    noOptionsText='Sin resultados'
                />
            </Box>
            {!!(cities.length) && (
                <Box p={2}>
                    <SelectInput
                        control={control}
                        name="city"
                        label='Ciudad'
                        options={cities}
                        optionLabel='nombre'
                        InputProps={{
                            placeholder: 'Seleccione una ciudad'
                        }}
                        noOptionsText='Sin resultados'
                    />
                </Box>
            )}
        </Box>
    );
}

export default Step2
