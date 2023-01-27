import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Trash2 } from 'lucide-react';
import Stack from '@mui/material/Stack';
import { apiProvider } from '../../../api'
import { alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DeletePublication = ({ open, handleClose, item, redirect = -1, sideAction }) => {
    const [onSubmit, setOnSubmit] = React.useState(false);
    const navigate = useNavigate()

    const deletePost = async () => {
        try {
            const res = await apiProvider.delete(`api/blog/${item.id}`)

            if (res.status >= 200 && res.status < 300) {
                navigate(redirect)

                if (sideAction) return sideAction()
            }

            return res;
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async () => {
        setOnSubmit(true);
        await deletePost()
        handleClose();
        setOnSubmit(false)
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
                        ¿Estás seguro que deseas eliminar tu publicación?
                    </Typography>
                    <Stack direction="column" marginTop={3}>
                        <Button variant="contained" disabled={onSubmit} onClick={handleDelete}>
                            Eliminar
                        </Button>
                        <Button onClick={handleClose} disabled={onSubmit} sx={{
                            color: '#858585',
                            '&:hover': {
                                backgroundColor: `${alpha('#858585', 0.1)}`
                            }
                        }}>
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </InstagramModal>
    );
}

export default DeletePublication
