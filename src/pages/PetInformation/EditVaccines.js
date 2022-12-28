import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { fileProvider, apiProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import formDataHandler from '../../utils/formDataHandler';
import Button from '../../components/Button';
import ChipArrayInput from '../../components/Forms/ChipArrayInput';
import useEffectOnce from '../../utils/useEffectOnce';
import CircularProgress from '@mui/material/CircularProgress';
import AddVaccines from '../Vaccines/AddVaccines';

const selectedCharacteristics = items => items.map(({ id }) => id)

const Form = ({ features }) => {
    const { state: { user }, dispatch } = useAuth();
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({
            'characteristics': selectedCharacteristics(user.dog.characteristic)
        }))
    });
    const navigate = useNavigate();

    const onSubmit = async values => {
        console.log(values)
        // try {
        //     const mappedCharacteristics = values.characteristics.map(value => ({
        //         id_charact: value
        //     }))

        //     const formData = {
        //         characteristic: mappedCharacteristics
        //     }
        //     const res = await fileProvider.put(`/api/dog/edit/${user.dog.id}`, formData)

        //     if (res.status >= 200 && res.status < 300) {
        //         renewToken(dispatch, user);
        //         navigate(-1);
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }

    console.log(user.dog.Vaccines)

    return (
        <Box sx={{
            pt: 1,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}  component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box>
                <Box sx={{ p: 2 }}>
                    <AddVaccines control={control} />
                </Box>
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
    );
}

const EditVaccines = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [features, setFeatures] = React.useState([])

    const fetchFeatures = async () => {
        try {
            const res = await apiProvider.get('api/characteristic/characteristics')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setFeatures(data);
                setIsLoading(false)
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    useEffectOnce(() => { fetchFeatures() }, []);

    return (
        <SettingsLayout title='Vacunas'>
            <Form />
        </SettingsLayout>
    );
}

export default EditVaccines
