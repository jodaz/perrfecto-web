import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '../Modal';
import { Typography } from '@mui/material';
import TextInput from '../../Forms/TextInput'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const validations = {
    code: {
        required: "Ingrese su codigo",
    }
}

const AskCode = ({ location }) => {
    const navigate = useNavigate();
    const [error, setError] = React.useState(false)
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = (data) => {
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

    return (
        <Modal
            location={location}
            pathname='/recover-password/code'
            title="Recuperar contraseña"
        >
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ m: 5 }}>
                    <TextInput
                        name="code"
                        control={control}
                        disabled={isSubmitting}
                        rules={{
                            required: true
                        }}
                        validations={validations}
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
                        disabled={isSubmitting}
                    >
                        Continuar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AskCode
