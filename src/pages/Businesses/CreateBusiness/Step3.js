import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GalleryInput from '../../../components/GalleryInput'
import { ADD_PHOTOS } from '../../../validations';

const Step3 = ({ control }) => (
    <Box>
        <Box p={2}>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                fontWeight={500}
            >
                PASO 3
            </Typography>
        </Box>
        <Box p={2}>
            <Typography
                variant="subtitle1"
                color="text.secondary"
            >
                Ingresar imágenes que identifiquen al negocio
            </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
            <GalleryInput
                control={control}
                name='files'
                rules={ADD_PHOTOS.rules}
                validations={ADD_PHOTOS.messages}
            />
        </Box>
    </Box>
);

export default Step3
