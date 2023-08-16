import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { XSquare } from 'lucide-react';
import Stack from '@mui/material/Stack';

const DeletedAccount = ({ open, handleClose }) => (
    <Dialog
        onClose={handleClose}
        open={open}
    >
        <Box sx={{
            m: 1,
            display: 'flex',
            width: 'fit-content',
            height: 'fit-content',
            p: 3,
            flexDirection: 'column',
            color: theme => theme.palette.text.secondary,
            textAlign: 'center'
        }}>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <XSquare size={48} />
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Cuenta eliminada
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Tu cuenta de TinderDogs se ha
                    <br />
                    eliminado con éxito.
                </Typography>
                <Stack direction="column">
                    <Button color="error" onClick={handleClose}>
                        Volver
                    </Button>
                </Stack>
            </Box>
        </Box>
    </Dialog>
);

export default DeletedAccount
