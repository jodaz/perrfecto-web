import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextInput from '../../components/Forms/TextInput'
import { Camera } from 'lucide-react';

const AdCertificate = ({ control }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()

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
            <Box sx={{ p: 2 }}>
                <TextInput
                    control={control}
                    name='name'
                    placeholder='Subir archivo'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton color="warning" onClick={() => console.log("Click me")}>
                                    <Camera />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    disabled
                />
            </Box>
        </Box>
    );
}

export default AdCertificate
