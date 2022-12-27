import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import SelectInput from '../../components/Forms/SelectInput';
import { DOG_AGE } from '../../validations';
import { fileProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import formDataHandler from '../../utils/formDataHandler';
import Button from '../../components/Button';
import generateYears from '../../utils/generateYears';

const years = generateYears();
const selectedYear = name => years.find(({ label }) => label == name)

const EditYearDate = () => {
    const { state: { user }, dispatch } = useAuth();
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({
            'dogAge': selectedYear(user.dog.dogAge)
        }))
    });
    const navigate = useNavigate();

    const onSubmit = async values => {
        try {
            const data = {
                dogAge: values.dogAge.label,
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
        <SettingsLayout title='Edad'>
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

export default EditYearDate
