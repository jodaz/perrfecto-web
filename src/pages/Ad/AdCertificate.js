import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextInput from '../../components/Forms/TextInput'
import { Camera, Trash2 } from 'lucide-react';

const AdCertificate = ({ control }) => {
    const [certificates, setCertificates] = React.useState([])
    const [indexes, setIndexes] = React.useState([0]);
    const [counter, setCounter] = React.useState(0);

    const addCertificate = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeCertificate = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{ p: 2 }}>
                <Typography variant='h6' gutterBottom fontWeight={500} color="primary.main">
                    Certificados
                </Typography>
            </Box>
            {indexes.map((index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, p: 1 }}>
                        <TextInput
                            control={control}
                            name='name'
                            placeholder='Subir archivo'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton color="warning">
                                            <Camera />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            disabled
                        />
                    </Box>
                    <Box>
                        <IconButton
                            onClick={removeCertificate(index)}
                            disabled={indexes.length == 1}
                        >
                            <Trash2 color="black" />
                        </IconButton>
                    </Box>
                </Box>
            ))}
            <Button onClick={addCertificate}>
                Añadir certificado
            </Button>
        </Box>
    );
}

export default AdCertificate
