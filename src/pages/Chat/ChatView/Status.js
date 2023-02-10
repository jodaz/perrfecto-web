import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Status({ active = true }) {
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
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: theme => active
                        ? theme.palette.success.main
                        : theme.palette.text.tertiary,
                    borderRadius: '50%'
                }} />
                <Box mr={1} />
                <Typography
                    variant="body2"
                    color="text.tertiary"
                    fontWeight={500}
                    fontSize='12px'
                >
                    Activo ahora
                </Typography>
            </Box>
        </Stack>
    );
}
