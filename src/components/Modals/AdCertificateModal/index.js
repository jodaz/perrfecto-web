import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Camera } from 'lucide-react';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material';

const AdCertificateModal = ({ open, handleClose }) => {
    const [errorAlert, setErrorAlert] = React.useState('')
    const navigate = useNavigate();

    const submitDelete = () => {
    };

    return (
        <InstagramModal handleClose={handleClose} open={open}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                p: 2,
                maxWidth: '280px',
                background: '#fff',
                borderRadius: 4,
                marginRight: '1rem',
                textAlign: 'center',
                color: theme => theme.palette.text.secondary,
            }}>
                <Box sx={{ p: 1, textAlign: 'center' }}>
                    <Camera size={48} />
                </Box>
                <Box sx={{ p: 1 }}>
                    <Box sx={{ p: 1 }}>
                        <Typography variant="body1" gutterBottom>
                            Añade tus certificados tomando una foto desde tu aplicación
                        </Typography>
                    </Box>
                    <Stack direction="column">
                        <Button color="primary" variant="contained" onClick={submitDelete}>
                            Abrir app
                        </Button>
                        <Button onClick={handleClose} sx={{
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

export default AdCertificateModal
