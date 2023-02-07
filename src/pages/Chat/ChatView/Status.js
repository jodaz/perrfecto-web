import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Status() {
    return (
        <Stack spacing={0}>
            <Box>
                <Typography
                    variant="subtitle1"
                    color="text.primary"
                >
                    Uma
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="subtitle1"
                    color="text.tertiary"
                    fontSize='10px'
                >
                    Activo ahora
                </Typography>
            </Box>
        </Stack>
    );
}
