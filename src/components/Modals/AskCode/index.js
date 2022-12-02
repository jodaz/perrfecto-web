import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '../Modal';
import PinInput from 'react-pin-input';
import { Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { apiProvider } from '../../../api'
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';

const endpoints = [
    '/api/auth/reset-password',
    '/api/auth/reset-password-phone'
]

const AskCode = ({ location }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const { state } = location;
    const [isCompletted, setIsCompletted] = React.useState(false)
    const [error, setError] = React.useState(false)
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = async (data) => {
        setError(false);

        const res = await apiProvider.post('/api/auth/verify-code', {
            ...data,
            ...state
        }).catch(error => {
            if (error.response.status == 400) {
                setError(true)
            }
        });

        if (res.status >= 200 && res.status < 300) {
            return navigate(`/recover-password/new`, {
                state: state
            })
        } else {
            setError(true)
        }
    };

    /**
     * Cuando pida un nuevo codigo, el boton submit debe quedar cargando
     * y el campo deshabilitado
     */
    const onSubmitNewCode = async () => {
        const endpoint = (state.method == 'email') ? endpoints[0] : endpoints[1];

        await apiProvider.post(endpoint, state)
            .catch(error => {
                setError(true)
            });
    };

    const onCompletedCodeHandler = () => {
        setIsCompletted(true)
    }

    return (
        <Modal
            location={location}
            pathname='/recover-password/code'
            title="Recuperar contraseña"
        >
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {(error) && (
                    <Alert severity="error" sx={{ marginBottom: '1.5rem' }}>
                        Ha ocurrido un error en su solicitud
                    </Alert>
                )}
                <Box sx={{ margin: '2rem 0', textAlign: 'center' }}>
                    <Controller
                        control={control}
                        name="code"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <PinInput
                                length={5}
                                type="numeric"
                                inputMode="number"
                                style={{ padding: '0px' }}
                                placeholder='0'
                                inputStyle={{ borderColor: 'red' }}
                                inputFocusStyle={{ borderColor: 'blue' }}
                                onChange={value => {
                                    onChange(value);
                                    setIsCompletted(false)
                                }}
                                onComplete={onCompletedCodeHandler}
                                onBlur={onBlur}
                                autoSelect={true}
                                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                            />
                        )}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: isSmall ? 'column' : 'row'
                }}>
                    <Typography color="text.secondary" variant="body2">
                        No has recibido el código?
                    </Typography>
                    <Box sx={{
                        color: theme => theme.palette.info.main,
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }} onClick={onSubmitNewCode}>
                        Reenviar código
                    </Box>
                </Box>
                <Box sx={{ p: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        disabled={isSubmitting || !isCompletted}
                    >
                        Continuar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AskCode
