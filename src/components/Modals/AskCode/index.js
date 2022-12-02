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
import Fade from '@mui/material/Fade';
import { alpha } from '@mui/material';

const endpoints = [
    '/api/auth/reset-password',
    '/api/auth/reset-password-phone'
]

const AskCode = ({ location }) => {
    const [success, setSuccess] = React.useState('')
    const [disabledLink, setDisabledLink] = React.useState(true)
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
        setError(false)
        setDisabledLink(true)
        const endpoint = (state.method == 'email') ? endpoints[0] : endpoints[1];

        await apiProvider.post(endpoint, state)
            .then(() => {
                setSuccess('Su código de recuperación ha sido enviado.')
            })
            .catch(error => {
                setSuccess(false)
                setError(true)
            });
    };

    const onCompletedCodeHandler = () => {
        setIsCompletted(true)
    }

    React.useEffect(() => {
        if (success) {
            setTimeout(() => setSuccess(''), 3000)
        }
    }, [success])

    React.useEffect(() => {
        if (disabledLink) {
            setTimeout(() => setDisabledLink(false), 30000)
        }
    }, [disabledLink])

    return (
        <Modal
            location={location}
            pathname='/recover-password/code'
            title="Recuperar contraseña"
        >
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {(success || error) && (
                    <Fade in={success || error}>
                        <Alert severity='success' sx={{ marginBottom: '1.5rem' }}>
                            {success}
                        </Alert>
                    </Fade>
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
                        transition: '0.3s',
                        color: theme => (!disabledLink) ? theme.palette.info.main : `${alpha(theme.palette.info.main, 0.5)}`,
                        textDecoration: 'underline',
                        cursor: disabledLink ? 'not-allowed' : 'pointer',
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
