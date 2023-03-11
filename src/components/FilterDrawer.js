import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogTitle from './DialogTitle';
import { useForm } from "react-hook-form";
import ciudades from '../utils/ciudades';
import provincias from '../utils/provincias';
import SelectInput from './Forms/SelectInput';
import {
    fetchPublications,
    usePublications,
    toggleFilters
} from '../context/PublicationContext';
import TextInput from './Forms/TextInput';
// import razas from '../utils/breeds';
import ChipArrayInput from './Forms/ChipArrayInput';
import SliderInput from './Forms/SliderInput';
import { alpha, useMediaQuery } from '@mui/material';
import { useAuth, toggleGeolocation } from '../context/AuthContext';
import useEffectOnce from '../utils/useEffectOnce';
import axios from 'axios'

const genders = [
    { label: 'Macho', value: 'male' },
    { label: 'Hembra', value: 'female' },
    { label: 'Ambos', value: 'both' },
]

const FilterDrawer = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [cities, setCities] = React.useState([])
    const { control, handleSubmit, watch, reset, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const { state: { userCoords }, dispatch: authDispatch } = useAuth()
    const province = watch('province')
    const [breeds, setBreeds] = React.useState([]);
    const { state: { openFilter }, dispatch } = usePublications();

    const resetAndToggleDrawer = () => {
        toggleFilters(dispatch)
        reset();
    }

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key !== 'Tab' || event.key !== 'Shift')) {
            if (event.keyCode == 27) {
                resetAndToggleDrawer()
            }
            return;
        }
        resetAndToggleDrawer()
    };

    const resetFilter = () => {
        reset();
        fetchPublications(dispatch)
    }

    const fetchBreeds = async () => {
        try {
            const res = await axios.get('https://dog.ceo/api/breeds/list/all')

            if (res.status >= 200 && res.status < 300) {
                const { data: { message } } = res;
                const breedsArr = Object.keys(message).map((name, i) => ({ value: i, label: name }))

                setBreeds(breedsArr)
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const onSubmit = async values => {
        const parsedData = {};

        try {
            let {
                province,
                breed,
                gender,
                city,
                distance
            } = values;

            if (breed) {
                parsedData.breed = breed.label;
            }
            if (gender) {
                parsedData.gender = (gender == 'both') ? '' : gender;
            }
            if (province) {
                parsedData.province = province.nombre;
            }
            if (city) {
                parsedData.city = city.nombre;
            }
            if (distance) {
                const { latitude, longitude } = userCoords

                parsedData.lat = latitude
                parsedData.lon = longitude
                parsedData.km = distance;
            }

            await fetchPublications(dispatch, parsedData)

            if (isSmall) {
                toggleFilters(dispatch)
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffectOnce(() => { fetchBreeds() }, [])

    const list = (anchor) => (
        <Box onKeyDown={toggleDrawer(anchor, false)} component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle onClose={toggleDrawer(anchor, false)}>
                Filtros
            </DialogTitle>
            <Divider />
            <Box sx={{ p: 3 }}>
                <TextInput
                    name='province'
                    control={control}
                    label='País'
                    value='España'
                    optionLabel='País'
                    disabled
                />
            </Box>
            <Box sx={{ p: 3 }}>
                <SelectInput
                    name='province'
                    control={control}
                    disabled={isSubmitting}
                    label='Ciudad, estado o provincia'
                    options={provincias}
                    optionLabel='nombre'
                    InputProps={{
                        placeholder: 'Seleccione'
                    }}
                    noOptionsText='Sin resultados'
                />
            </Box>
            {!!(cities.length) && (
                <Box sx={{ p: 3 }}>
                    <SelectInput
                        name='city'
                        control={control}
                        disabled={isSubmitting}
                        label='Distrito'
                        options={cities}
                        optionLabel='nombre'
                        InputProps={{
                            placeholder: 'Seleccione'
                        }}
                        noOptionsText='Sin resultados'
                    />
                </Box>
            )}
            <Divider />
            <Box sx={{ p: 3 }}>
                <ChipArrayInput
                    control={control}
                    name='gender'
                    labels={genders}
                    disabled={isSubmitting}
                    label='Sexo'
                    property='label'
                    propertyValue='value'
                    exclusive
                />
            </Box>
            <Divider />
            <Box sx={{ p: 3 }}>
                <SliderInput
                    label='Distancia'
                    control={control}
                    name="distance"
                    disabled={isSubmitting || !userCoords}
                    handleClick={(isSubmitting || !userCoords)
                        ? () => toggleGeolocation(authDispatch)
                        : null
                    }
                />
            </Box>
            <Divider />
            <Box sx={{ p: 3 }}>
                {!!breeds.length && (
                    <SelectInput
                        label="Raza"
                        control={control}
                        options={breeds}
                        disabled={isSubmitting}
                        name="breed"
                        InputProps={{
                            placeholder: 'Seleccione la raza'
                        }}
                        noOptionsText='Sin resultados'
                    />
                )}
            </Box>
            <Box sx={{ p: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    Filtrar
                </Button>
                <Box mt={2} />
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => resetFilter()}
                    sx={{
                        backgroundColor: '#ccc',
                        '&:hover': {
                            color: '#fff',
                            backgroundColor: alpha(`#000`, 0.3)
                        }
                    }}
                >
                    Restablecer
                </Button>
            </Box>
        </Box>
    );

    React.useEffect(() => {
        if (province) {
            const filteredCities = ciudades
                .filter(({ id_provincia }) => id_provincia == province.id)

            setCities(filteredCities)
        }
    }, [province])

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Drawer
                    anchor={'bottom'}
                    open={openFilter}
                    onClose={toggleDrawer('bottom', false)}
                    sx={{
                        '& .MuiPaper-root': {
                            position: 'absolute',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            width: '99%',
                            bottom: 0
                        },
                    }}
                    PaperProps={{ style: { position: 'absolute' } }}
                    BackdropProps={{ style: { position: 'absolute' } }}
                    ModalProps={{
                        container: document.getElementById('drawer-container'),
                        style: { position: 'absolute' }
                    }}
                >
                    {list('bottom')}
                </Drawer>
            </Box>
        </Box>
    );
}

export default FilterDrawer
