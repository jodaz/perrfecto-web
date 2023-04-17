import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import Button from '../../../components/Button';
import { apiProvider } from '../../../api';
import { useAuth } from '../../../context/AuthContext';

export default function BlockedUser({ sideAction, locked, receptor }) {
    const { state: { user } } = useAuth()
    const [onSubmit, setOnSubmit] = React.useState(false);
    const isCurrentUserLocked = locked.user_locked.id == user.id;

    const unblockUserAction = async () => {
        setOnSubmit(true)
        try {
            const res = await apiProvider.post('/api/chat/unlock-conversation', {
                "uid_locked": receptor.id
            });

            if (res.status >= 200 && res.status < 300) {
                sideAction()
            }
        } catch (error) {
            console.log(error)
        }
        setOnSubmit(false)
    }

    return (
        <Stack
            spacing={1}
            alignItems='center'
            margin={2}
        >
            <Box color="text.tertiary">
                <SpeakerNotesOffIcon />
            </Box>
            <Box>
                <Typography
                    variant="subtitle1"
                    color="text.tertiary"
                >
                    {!isCurrentUserLocked ? (
                        'El usuario ha sido bloqueado. Si deseas cambiar de opinión, presiona desbloquear'
                    ) : (
                        'Haz sido bloqueado por el usuario. No podrás enviar ni recibir nuevos mensajes.'
                    )}
                </Typography>
            </Box>
            {!isCurrentUserLocked && (
                <Box>
                    <Button
                        sx={{
                            color: theme => theme.palette.text.secondary
                        }}
                        onClick={unblockUserAction}
                        disabled={onSubmit}
                    >
                        Desbloquear
                    </Button>
                </Box>
            )}
        </Stack>
    );
}
