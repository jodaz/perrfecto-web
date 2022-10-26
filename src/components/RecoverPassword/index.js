import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import EmailSendIcon from '../../assets/icons/EmailSend'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import vars from '../../vars'
import { apiProvider } from '../../api'
import DialogTitle from '../DialogTitle'
import { ReactComponent as MessageIcon2 } from '../../assets/icons/Message2.svg'

export default function RecoverPassword({ location }) {
    const navigate = useNavigate()
    const [error, setError] = React.useState(false)
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = async (data) => {
        setError(false);

        const response = await apiProvider.post('/api/auth/signin', {
            ...data,
            tipo: 1
        }).catch(error => {
            if (error.response.status == 401) {
                setError(true)
            }
        });

        const { data: result } = response;

        localStorage.setItem(vars.authToken, result.access_token);
        navigate('/home')
    };

    const handleClose = () => navigate('/')

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/recover-password'}
        >
            <DialogTitle onClose={handleClose} />
            <Box sx={{
                m: 1,
                display: 'flex',
                width: '350px',
                height: '350px',
                p: 3,
                color: theme => theme.palette.text.secondary
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box component='h2' margin='0 0 1rem 0' color="text.primary">
                        Recuperar contraseña
                    </Box>
                    <Box>
                        ¿Cómo deseas recuperar tu contraseña?
                    </Box>
                    <List sx={{ marginTop: '2rem' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <EmailSendIcon />
                                </ListItemIcon>
                                <ListItemText primary="Enviar un correo electrónico" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MessageIcon2 />
                                </ListItemIcon>
                                <ListItemText primary="Enviar un SMS" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Dialog>
    );
}
