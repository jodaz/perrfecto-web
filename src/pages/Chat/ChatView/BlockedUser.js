import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PhoneOff } from 'lucide-react';

export default function BlockedUser() {
    return (
        <Stack
            spacing={1}
            alignItems='center'
            margin={2}
        >
            <Box color="text.tertiary">
                <PhoneOff />
            </Box>
            <Box>
                <Typography
                    variant="subtitle1"
                    color="text.tertiary"
                >
                    El usuario ha sido bloqueado.
                    Si deseas cambiar de opinión, presiona desbloquear
                </Typography>
            </Box>
            <Box>
                <Button
                    sx={{
                        color: theme => theme.palette.text.secondary
                    }}
                >
                    Desbloquear
                </Button>
            </Box>
        </Stack>
    );
}
