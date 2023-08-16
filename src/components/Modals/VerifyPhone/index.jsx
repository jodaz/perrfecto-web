import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PinInput from 'react-pin-input';
import { useForm, Controller } from "react-hook-form";
import { apiProvider } from '../../../api'
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';
import Fade from '@mui/material/Fade';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../../DialogTitle';

const VerifyPhone = ({
    open,
    data,
    handleClose,
    updateStatus,
    method = 'PUT',
    endpoint,
    title
}) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [success, setSuccess] = React.useState('')
    const [disabledLink, setDisabledLink] = React.useState(true)
    const [isCompletted, setIsCompletted] = React.useState(false)
    const [error, setError] = React.useState(false)
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    let pin = React.useRef();

    const onSubmit = async values => {
        setError(false);

        try {
            const res = await apiProvider({
                method: method,
                url: endpoint,
                data: {
                    ...data,
                    ...values
                }
            })

            if (res.status >= 200 && res.status < 300) {
                updateStatus(res)
                handleClose()
            } else {
                setError(true)
            }
        } catch(error) {
            pin.current.clear();
            const data = error.response.data;

            if (data) {
                if (data.msg.includes('Incorrect')) {
                    setError('Código inválido.')
                }
                if (data.msg.includes('expirsed')) {
                    setError('Código expirado.')
                }
            }
        };
    };

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
        <Dialog
            onClose={handleClose}
            open={open}
        >
            <DialogTitle onClose={handleClose} />
            <Box sx={{
                m: 1,
                display: 'flex',
                width: isSmall ? 'fit-content' : '400px',
                height: 'fit-content',
                p: 3,
                color: theme => theme.palette.text.secondary
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box component='h2' margin='0 0 1rem 0' color="text.primary">
                        {title}
                    </Box>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        {(success) && (
                            <Fade in={success}>
                                <Alert severity='success' sx={{ marginBottom: '1.5rem' }}>
                                    {success}
                                </Alert>
                            </Fade>
                        )}
                        {(error) && (
                            <Fade in={error}>
                                <Alert severity='error' sx={{ marginBottom: '1.5rem' }}>
                                    {error}
                                </Alert>
                            </Fade>
                        )}
                        <Box sx={{ margin: '2rem 0', textAlign: 'center' }}>
                            <Controller
                                control={control}
                                name="code"
                                render={({ field: { onChange, onBlur } }) => (
                                    <PinInput
                                        length={5}
                                        type="numeric"
                                        inputMode="number"
                                        style={{ padding: '0px' }}
                                        placeholder='0'
                                        inputStyle={{ borderColor: 'red' }}
                                        inputFocusStyle={{ borderColor: 'blue' }}
                                        onChange={value => {
                                            setError(null)
                                            onChange(value);
                                            setIsCompletted(false)
                                        }}
                                        onComplete={value => {
                                            onChange(value);
                                            setIsCompletted(true);
                                        }}
                                        onBlur={onBlur}
                                        autoSelect={true}
                                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                        ref={p => (pin.current = p)}
                                    />
                                )}
                            />
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
                </Box>
            </Box>
        </Dialog>
    );
}

export default VerifyPhone
