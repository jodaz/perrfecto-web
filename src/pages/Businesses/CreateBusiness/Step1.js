import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextInput from '../../../components/Forms/TextInput';
import {
    DESCRIPTION,
    BUSINESS_NAME
} from '../../../validations';
import SelectInput from '../../../components/Forms/SelectInput';

const categories = [
    {
        value: 'store', label: 'Tienda de mascotas'
    }
]

const Step1 = ({ control }) => (
    <Box>
        <Box p={2}>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                fontWeight={500}
            >
                PASO 1
            </Typography>
        </Box>
        <Box p={2}>
            <Typography
                variant="subtitle1"
                color="text.secondary"
            >
                Ingresar información sobre el negocio
            </Typography>
        </Box>
        <Box p={2}>
            <TextInput
                control={control}
                name='name'
                label='Nombre del negocio'
                rules={BUSINESS_NAME.rules}
                validations={BUSINESS_NAME.messages}
            />
        </Box>
        <Box p={2}>
            <SelectInput
                control={control}
                name="category"
                label='Categoría'
                options={categories}
            />
        </Box>
        <Box p={2}>
            <TextInput
                control={control}
                name='whastapp'
                label='WhatsApp (negocio)'
            />
        </Box>
        <Box p={2}>
            <TextInput
                control={control}
                name='facebook'
                label='Facebook (negocio)'
            />
        </Box>
        <Box p={2}>
            <TextInput
                control={control}
                name='instagram'
                label='Instagram (negocio)'
            />
        </Box>
        <Box p={2}>
            <TextInput
                control={control}
                name='url'
                label='Sitio web'
            />
        </Box>
        <Box p={2}>
            <TextInput
                control={control}
                name='description'
                label='Descripción'
                rules={DESCRIPTION.rules}
                validations={DESCRIPTION.messages}
                multiline
                maxRows={4}
                rows={4}
                sx={{
                    borderRadius: '16px !important',
                }}
            />
        </Box>
    </Box>
);

export default Step1
