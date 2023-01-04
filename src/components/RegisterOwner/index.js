import * as React from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogTitle from '../DialogTitle';
import Divider from '@mui/material/Divider';
import PhotoInput from '../Forms/PhotoInput';
import DateInput from '../Forms/DateInput';
import formDataHandler from '../../utils/formDataHandler';
import { fileProvider } from '../../api'
import { useAuth, renewToken } from '../../context/AuthContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import PhoneInput from '../Forms/PhoneInput'
import { PHOTO, DATE_BIRTH, PROVINCE, CITY, PHONE } from '../../validations';
import SelectInput from '../Forms/SelectInput';
import provincias from '../../utils/provincias';
import dirtyCities from '../../utils/ciudades';

const RegisterOwner = ({ open, handleClose, redirect = '/home' }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [errorAlert, setErrorAlert] = React.useState(false)
    const { control, handleSubmit, watch, setError, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({ 'code_phone': 34 }))
    });
    const [cities, setCities] = React.useState([])
    const navigate = useNavigate();
    const { state: { user },dispatch } = useAuth();
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

            const formData = await formDataHandler(data, 'files')

            const res = await fileProvider.put(`/api/auth/user-edit/${user.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                handleClose();
                await renewToken(dispatch, user);
                navigate(redirect)
            }
        } catch (error) {
            if (error.response.data.msg) {
                const message = error.response.data.msg;

                if (message.includes('There is a user with the provided that phone')) {
                    setError('phone', {
                        type: 'unique'
                    })
                }
            } else {
                setErrorAlert('Ha ocurrido un error inesperado.')
            }
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
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose} />
            <Box sx={{
                display: 'flex',
                width: isSmall ? 'fit-content' : '800px',
                height: 'fit-content',
                p: 2,
                color: theme => theme.palette.text.secondary
            }}>
                {!isSmall && (
                    <>
                        <Box sx={{ flex: 1, p: 2 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: '500' }}>
                                Datos del propietario
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Completa la siguiente información personal para añadir a tu perfil.
                            </Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem>o</Divider>
                    </>
                )}
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    {(isSmall) && (
                        <Box mb={4}>
                            <Typography variant="h6" gutterBottom>
                                Datos del propietario
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Completa la siguiente información personal para añadir a tu perfil.
                            </Typography>
                        </Box>
                    )}
                    {(errorAlert) && (
                        <Alert severity="error" sx={{ marginBottom: '1.5rem' }}>
                            {errorAlert}
                        </Alert>
                    )}
                    <Box sx={{
                        flex: 1
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <Box width='200px' textAlign='center'>
                                <Typography variant="h6" color="text.main" gutterBottom>
                                    Sube tu foto de perfil
                                </Typography>
                                <Typography variant="body2" color="text.main" gutterBottom>
                                    Esta foto será visible para todos los usuarios
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <PhotoInput
                                    name="files"
                                    control={control}
                                    disabled={isSubmitting}
                                    rules={PHOTO.rules}
                                    validations={PHOTO.messages}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <PhoneInput
                                label="Teléfono"
                                control={control}
                                name="phone"
                                rules={PHONE.rules}
                                validations={PHONE.messages}
                                placeholder='Ingresar teléfono'
                            />
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <DateInput
                                name='date_birth'
                                control={control}
                                disabled={isSubmitting}
                                rules={DATE_BIRTH.rules}
                                validations={DATE_BIRTH.messages}
                                label='Fecha de cumpleaños'
                            />
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
                                noOptionsText='Sin resultados'
                            />
                        </Box>
                        {!!(cities.length) && (
                            <Box sx={{ p: 2 }}>
                                <SelectInput
                                    name='city'
                                    control={control}
                                    disabled={isSubmitting}
                                    label='Distrito'
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
                        )}
                        <Box sx={{ p: 3 }}>
                            <Button
                                disabled={isSubmitting}
                                variant="contained"
                                type="submit"
                                fullWidth
                            >
                                Siguiente
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}

export default RegisterOwner;
