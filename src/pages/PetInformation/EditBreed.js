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

const selectedBreed = name => razas.find(({ label }) => label === name)

const EditBreed = () => {
    const { state: { user }, dispatch } = useAuth();
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

export default EditBreed
