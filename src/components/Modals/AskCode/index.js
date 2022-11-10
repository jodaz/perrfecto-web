import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '../Modal';
import PinInput from 'react-pin-input';
import { Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const AskCode = ({ location }) => {
    const navigate = useNavigate();
    const [isCompletted, setIsCompletted] = React.useState(false)
    const [error, setError] = React.useState(false)
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = data => {
        // setError(false);

        // // const response = await apiProvider.post('/api/auth/signin', {
        // //     ...data,
        // //     tipo: 1
        // // }).catch(error => {
        // //     if (error.response.status == 401) {
        // //         setError(true)
        // //     }
        // // });

        // // const { data: result } = response;
        return navigate(`/recover-password/new`)
    };

    const onSubmitNewCode = (data) => {
        // console.log(data)
        // setError(false);

        // // const response = await apiProvider.post('/api/auth/signin', {
        // //     ...data,
        // //     tipo: 1
        // // }).catch(error => {
        // //     if (error.response.status == 401) {
        // //         setError(true)
        // //     }
        // // });

        // // const { data: result } = response;
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
                <Box sx={{ margin: '2rem 0', textAlign: 'center' }}>
                    <Controller
                        control={control}
                        name="code"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <PinInput
                                length={6}
                                type="numeric"
                                inputMode="number"
                                style={{ padding: '0px' }}
                                placeholder='0'
                                inputStyle={{borderColor: 'red'}}
                                inputFocusStyle={{borderColor: 'blue'}}
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
                <Box display="flex" justifyContent='space-between'>
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
