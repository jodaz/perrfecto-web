import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Trash2 } from 'lucide-react';
import Stack from '@mui/material/Stack';
import { apiProvider } from '../../../api'
import { alpha } from '@mui/material';

const DeleteFavourite = ({ open, handleClose, item, handleDelete }) => {
    const [onSubmit, setOnSubmit] = React.useState(false);

    const submitDelete = async () => {
        setOnSubmit(true);
        try {
            const res = await apiProvider.delete(`api/fav/${item.id}`)

            if (res.status >= 200 && res.status < 300) {
                handleDelete(item);
                handleClose();
            }
        } catch (error) {
            console.log("error ", error)
        }
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
                    <Typography variant="body2" gutterBottom>
                        ¿Estás seguro que deseas eliminar a “{item.Ad.publi.name}” de favoritos?
                    </Typography>
                    <Stack direction="column">
                        <Button color="error" disabled={onSubmit} onClick={submitDelete}>
                            Eliminar favorit@
                        </Button>
                        <Button onClick={handleClose} disabled={onSubmit} sx={{
                            color: '#858585',
                            '&:hover': {
                                backgroundColor: `${alpha('#858585', 0.1)}`
                            }
                        }}>
                            Volver
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </InstagramModal>
    );
}

export default DeleteFavourite
