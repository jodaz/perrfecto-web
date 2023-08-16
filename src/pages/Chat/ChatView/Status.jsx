import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useChat } from '../../../context/ChatContext'
import isConnectedUser from '../../../utils/isConnectedUser';

const Status = () => {
    const { state: { users, receptor } } = useChat();
    const connected = isConnectedUser(users, receptor)

    return (
        <Stack spacing={0}>
            <Box>
                <Typography
                    variant="subtitle1"
                    color="text.primary"
                >
                    {receptor.name}
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
                    backgroundColor: theme => connected
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
                    {connected ? 'Activo ahora' : 'Desconectado'}
                </Typography>
            </Box>
        </Stack>
    );
}

export default Status;
