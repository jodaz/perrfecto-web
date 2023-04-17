import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import Button from '../../Button';
import Typography from '@mui/material/Typography';
import { Trash2 } from 'lucide-react';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material';
import { deleteMessage as delMessageSocket } from '../../../utils/socket';
import { useChat, deleteMessage } from '../../../context/ChatContext';

const DeleteMessage = ({ open, handleClose }) => {
    const { dispatch } = useChat();

    const handleDelete = async () => {
        try {
            await delMessageSocket({
                message: open.id,
                sender: open.uid
            })

            deleteMessage(dispatch, open.id);
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    if (!open) return null;

    return (
        <InstagramModal
            handleClose={handleClose}
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
                    <Trash2 size={48} />
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        ¿Estás seguro que deseas eliminar este mensaje?
                    </Typography>
                    <Stack direction="column">
                        <Button
                            color="error"
                            onClick={handleDelete}
                        >
                            Eliminar
                        </Button>
                        <MuiButton onClick={handleClose} sx={{
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

export default DeleteMessage
