import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { Phone } from 'lucide-react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ContactDialog = () => {
    const [open, setOpen] = React.useState(true)

    return (
        <Dialog
            onClose={() => setOpen(false)}
            open={open}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                p: 2,
                maxWidth: '280px',
                alignItems: 'center'
            }}>
                <Avatar sx={{
                    border: '2px solid #F59E0B',
                    height: '85px',
                    width: '85px'
                }}
                    src={`/images/samples/Pupi.png`}
                />
                <Box sx={{ p: 2 }}>
                    <Typography
                        color="text.primary"
                        variant="h6"
                        fontWeight={500}
                        gutterBottom
                        textAlign='center'
                    >
                        ¿Cómo quieres contactar a Pupi?
                    </Typography>
                    <Typography
                        color="text.tertiary"
                        variant="body1"
                        textAlign='center'
                    >
                        Haz click en la opción de tu interés
                    </Typography>
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ p: 1 }}>
                            <Button
                                variant="contained"
                                color="info"
                                fullWidth
                            >
                                <Phone /> Llamar
                            </Button>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                            >
                                <WhatsApp /> Whatsapp
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}

export default ContactDialog
