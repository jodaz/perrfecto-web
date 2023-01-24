import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import InstagramModal from '../InstagramModal';
import getUserPhoto from '../../../utils/getUserPhoto';

const ContactBusiness = ({ User, AnnMultimedia, handleClose, open }) => (
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
            }} src={getUserPhoto(AnnMultimedia[0].name)} />
            <Box sx={{ p: 2 }}>
                <Typography
                    color="text.secondary"
                    variant="subtitle1"
                    textAlign='center'
                >
                    Al hacer click en Whatsapp se abrira el chat para que puedas
                    contactar con el negocio.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Box sx={{ p: 1 }}>
                    <Button
                        variant="contained"
                        color="success"
                        target='_blank'
                        href={`https://wa.me/${User.code_phone}${User.phone}`}
                        fullWidth
                    >
                        <WhatsApp /> Whatsapp
                    </Button>
                </Box>
                <Box sx={{ p: 1 }}>
                    <Button
                        sx={{ color: '#858585' }}
                        onClick={handleClose}
                        fullWidth
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Box>
    </InstagramModal>
);

export default ContactBusiness
