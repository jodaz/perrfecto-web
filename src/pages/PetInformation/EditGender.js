import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import SelectInput from '../../components/Forms/SelectInput';
import { DOG_GENDER } from '../../validations';
import { fileProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import formDataHandler from '../../utils/formDataHandler';
import Button from '../../components/Button';
import generos from '../../utils/generos';

const selectedGender = name => generos.find(({ label }) => label === name)

const EditGender = () => {
    const { state: { user }, dispatch } = useAuth();
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({
            'gender': selectedGender(user.dog.gender)
        }))
    });
    const navigate = useNavigate();

    const onSubmit = async values => {
        try {
            const data = {
                gender: values.gender.label,
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

export default EditGender
