import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import Button from '../../Button';
import Typography from '@mui/material/Typography';
import { Trash2 } from 'lucide-react';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material';
import { apiProvider } from '../../../api'
import { useNavigate, useParams } from 'react-router-dom';

const DeleteChat = ({ open, handleClose }) => {
    const { chatID } = useParams()
    const [onSubmit, setOnSubmit] = React.useState(false);
    const navigate = useNavigate()

    const handleDelete = async () => {
        setOnSubmit(true)
        try {
            const res = await apiProvider.delete(`/api/chat/delete-conversation/${chatID}`)

            if (res.status >= 200 && res.status < 300) {
                setOnSubmit(false)
                return navigate('/chat')
            }
        } catch (error) {
            setOnSubmit(false)
            console.log(error)
        }
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
                    <Trash2 size={48} />
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        ¿Estás seguro que deseas eliminar esta conversación?
                    </Typography>
                    <Stack direction="column">
                        <Button
                            color="error"
                            disabled={onSubmit}
                            onClick={handleDelete}
                        >
                            Eliminar conversación
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

export default DeleteChat
