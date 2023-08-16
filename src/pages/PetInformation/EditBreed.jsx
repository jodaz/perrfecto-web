import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import SelectInput from '../../components/Forms/SelectInput';
import { BREED } from '../../validations';
import { fileProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import formDataHandler from '../../utils/formDataHandler';
import Button from '../../components/Button';
import razas from '../../utils/breeds';
import axios from 'axios'
import useEffectOnce from '../../utils/useEffectOnce';

const selectedBreed = name => razas.find(({ label }) => label === name)

const EditBreed = () => {
    const { state: { user }, dispatch } = useAuth();
    const [breeds, setBreeds] = React.useState([]);
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({
            'breed': selectedBreed(user.dog.breed)
        }))
    });
    const navigate = useNavigate();

    const onSubmit = async values => {
        try {
            const data = {
                breed: values.breed.label,
            };

            const formData = await formDataHandler(data)
            const res = await fileProvider.put(`/api/dog/edit/${user.dog.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user);
                navigate(-1);
            }
        } catch (error) {
            console.log(error)
        }
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

    useEffectOnce(() => { fetchBreeds() }, [])

    return (
        <SettingsLayout title='Raza'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    {!!breeds.length && (
                        <Box sx={{ p: 2 }}>
                            <SelectInput
                                label="Raza"
                                control={control}
                                options={breeds}
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
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default EditBreed
