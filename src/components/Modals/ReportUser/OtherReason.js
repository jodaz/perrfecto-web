import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Flag } from 'lucide-react';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import TextInput from '../../Forms/TextInput';
import { DESCRIPTION } from '../../../validations';

const OtherReason = ({ receptor, toggleNextStep, setReason }) => {
    const { control, handleSubmit } = useForm()

    const onSubmit = values => {
        setReason(values.description)
        toggleNextStep('reportUser')
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            p: 2,
            maxWidth: '280px',
            alignItems: 'center',
            background: '#fff',
            borderRadius: 4,
            marginRight: '1rem',
            textAlign: 'center',
            color: theme => theme.palette.text.secondary,
        }}>
            <Stack
                orientation="column"
                spacing={3}
                alignItems="center"
            >
                <Flag size={40} />
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                    ¿Estás seguro que deseas reportar a este usuario?
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Tranquil@, "{receptor.name}" no lo sabrá
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        name='description'
                        control={control}
                        placeholder='Escribir aquí'
                        multiline
                        maxRows={4}
                        rows={4}
                        label='Describe "otro motivo"'
                        labelColor="text"
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
                    <Button type="submit">
                        Continuar
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}

export default OtherReason
