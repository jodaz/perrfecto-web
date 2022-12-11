import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LinkBehavior from '../../LinkBehavior';
import Typography from '@mui/material/Typography';
import DialogTitle from '../../DialogTitle';

const RegisterWarning = () => {
    const [open, setOpen] = React.useState(true)

    return (
        <Dialog
            onClose={() => setOpen(false)}
            open={open}
        >
            <DialogTitle onClose={() => setOpen(false)} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                p: 2
            }}>
                <Box sx={{ p: 2 }}>
                    <Typography color="text.primary" variant="h4" fontWeight={500} gutterBottom>
                        ¡Registrate!
                    </Typography>
                    <Typography color="text.secondary" variant="body1" textAlign='center'>
                        Actualmente tienes acceso <br />como invitado,
                        para enviar <br />mensajes, pulsa el botón y <br />registrate.
                    </Typography>
                    <Box sx={{ p: 3 }}>
                        <Button
                            variant="contained"
                            color="warning"
                            fullWidth
                            type="submit"
                            component={LinkBehavior}
                            to='/register'
                            sx={{ color: '#fff' }}
                        >
                            Registrarme
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}

export default RegisterWarning
