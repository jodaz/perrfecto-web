import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { XSquare } from 'lucide-react';
import Stack from '@mui/material/Stack';

const PublicationWait = ({ open, handleClose }) => {

    return (
        <InstagramModal handleClose={handleClose} open={open}>
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
                    <Box component='img' src='/images/default/WaitLoadIcon.png' />
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography variant="h6" gutterBottom fontWeight={500}>
                        Anuncio en espera
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Tu anuncio será revisado por un moderador para asegurar que se
                        encuentre dentro de los términos de uso de la aplicación.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        La revisión estimada es de 24 horas y se te notificará sobre el estado de tu anuncio
                    </Typography>
                    <Stack direction="column">
                        <Button color="primary">
                           Ok
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </InstagramModal>
    );
}

export default PublicationWait
