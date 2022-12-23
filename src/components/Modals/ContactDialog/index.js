import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { Phone } from 'lucide-react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import InstagramModal from '../InstagramModal';
import getUserPhoto from '../../../utils/getUserPhoto';

const ContactDialog = ({ data, handleClose, open }) => {
    const dogPhoto = getUserPhoto(JSON.parse(data.multimedia)[0]);

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
                marginRight: '1rem'
            }}>
                <Avatar sx={{
                    border: '2px solid #F59E0B',
                    height: '85px',
                    width: '85px'
                }} src={dogPhoto} />
                <Box sx={{ p: 2 }}>
                    {(data.permission_whatsapp) && (
                        <>
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
                        </>
                    )}
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ p: 1 }}>
                            <Button
                                variant="contained"
                                color="info"
                                fullWidth
                                target='_blank'
                                href={`tel:+${data.publi.Owner.code_phone}${data.publi.Owner.phone}`}
                            >
                                <Phone /> Llamar
                            </Button>
                        </Box>
                        {(data.permission_whatsapp) && (
                            <Box sx={{ p: 1 }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    target='_blank'
                                    href={`https://wa.me/${data.publi.Owner.code_phone}${data.publi.Owner.phone}`}
                                    fullWidth
                                >
                                    <WhatsApp /> Whatsapp
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </InstagramModal>
    );
}

export default ContactDialog
