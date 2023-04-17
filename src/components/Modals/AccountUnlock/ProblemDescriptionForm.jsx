import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import TextInput from '../../Forms/TextInput';
import { useNavigate } from 'react-router-dom';
import { DESCRIPTION } from '../../../validations'

const ProblemDescriptionForm = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = async (values) => {
        navigate('?contact=true', {
            state: values
        })
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                m: 1,
                flex: 1
            }}
        >
            <Box sx={{ p: 1 }}>
                <TextInput
                    name='description'
                    control={control}
                    placeholder='Escribir aquí'
                    multiline
                    maxRows={4}
                    rows={4}
                    labelColor="text"
                    label='Descripción del problema'
                    rules={DESCRIPTION.rules}
                    validations={DESCRIPTION.messages}
                    sx={{
                        border: 'none !important',
                        padding: 0,
                        '&.Mui-focused': {
                            boxShadow: 'none',
                            borderColor: 'none'
                        },
                    }}
                />
            </Box>
            <Box sx={{ p: 1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    );
}

export default ProblemDescriptionForm
