import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import SelectInput from '../../components/Forms/SelectInput';

const countries = [
    { label: 'España', value: 'España' },
    { label: 'Venezuela', value: 'Venezuela' },
    { label: 'Chile', value: 'Chile' },
]

const CreateAdLocation = ({ control }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{ p: 2 }}>
                <Typography variant='h6' gutterBottom fontWeight={500}>
                    ¿Dónde vives?
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <SelectInput
                    control={control}
                    label='País'
                    name='country'
                    placeholder='Seleccionar'
                    options={countries}
                />
            </Box>
            <Box sx={{ p: 2 }}>
                <SelectInput
                    control={control}
                    label='Ciudad, estado o provincia'
                    name='city'
                    placeholder='Seleccionar'
                    options={countries}
                />
            </Box>
            <Box sx={{ p: 2 }}>
                <SelectInput
                    control={control}
                    label='Distrito'
                    name='district'
                    placeholder='Seleccionar'
                    options={countries}
                />
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant='body2' gutterBottom>
                    *Esta información solo servirá para mostrarte a personas potenciales por medio de filtros
                </Typography>
            </Box>
        </Box>
    );
}

export default CreateAdLocation
