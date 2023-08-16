import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { fileProvider } from '../../api'
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext';
import formDataHandler from '../../utils/formDataHandler';
import Button from '../../components/Button';
import AddVaccines from '../Vaccines/AddVaccines';
import SettingsLayout from '../../layouts/SettingsLayout';

const EditVaccines = () => {
    const { state: { user }, dispatch } = useAuth();
    const [isFetching, setIsFetching] = React.useState(true);
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({
            'vaccines': user.dog.Vaccines
        }))
    });
    const navigate = useNavigate();

    const onSubmit = async values => {
        try {
            const mappedVaccines = values.vaccines.map(({ id }) => ({
                id_vaccine: id
            }))

            const parsedData = {
                vaccines: mappedVaccines
            }

            const formData = await formDataHandler(parsedData)

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
        <SettingsLayout title='Vacunas'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}  component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box sx={{ p: 2 }}>
                        <AddVaccines
                            control={control}
                            funcHandler={() => setIsFetching(false)}
                            disabled={isSubmitting}
                        />
                    </Box>
                </Box>
                {!isFetching && (
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
                )}
            </Box>
        </SettingsLayout>
    );
}

export default EditVaccines
