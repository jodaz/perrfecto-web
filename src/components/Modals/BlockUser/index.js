import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import Button from '../../Button';
import MuiButton from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material';
import { apiProvider } from '../../../api';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';

const BlockUser = ({ open, handleClose, sideAction, item }) => {
    const [onSubmit, setOnSubmit] = React.useState(false);

    const blockUserAction = async () => {
        setOnSubmit(true)
        try {
            const res = await apiProvider.post('/api/chat/block-conversation', {
                "conversation_id": item.receptor.id_conversation,
                "uid_locked": item.receptor.user.id
            });

            if (res.status >= 200 && res.status < 300) {
                sideAction()
            }
        } catch (error) {
            console.log(error)
        }
        setOnSubmit(false)
        handleClose();
    }

    if (!open) return null;

    return (
        <InstagramModal
            handleClose={() => {
                handleClose()
                setOnSubmit(false)
            }}
            open={open}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                p: 2,
                maxWidth: '280px',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 4,
                marginRight: '1rem',
                textAlign: 'center',
                color: theme => theme.palette.text.secondary,
            }}>
                <Box sx={{ p: 1, textAlign: 'center' }}>
                    <PersonOffOutlinedIcon sx={{ fontSize: 60 }} color="text.secondary" />
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        ¿Estás seguro que deseas bloquear a este usuario?
                    </Typography>
                    <Stack direction="column">
                        <Button
                            color="error"
                            variant="contained"
                            disabled={onSubmit}
                            onClick={blockUserAction}
                        >
                            Bloquear usuario
                        </Button>
                        <MuiButton onClick={handleClose} disabled={onSubmit} sx={{
                            color: '#858585',
                            '&:hover': {
                                backgroundColor: `${alpha('#858585', 0.1)}`
                            }
                        }}>
                            Cancelar
                        </MuiButton>
                    </Stack>
                </Box>
            </Box>
        </InstagramModal>
    );
}

export default BlockUser
