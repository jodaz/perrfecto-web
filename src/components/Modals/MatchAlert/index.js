import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import InstagramModal from '../InstagramModal';
import getUserPhoto from '../../../utils/getUserPhoto';
import { apiProvider } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { useChat, openChat } from '../../../context/ChatContext';
import { useAuth } from '../../../context/AuthContext';

const MatchAlert = ({ data, handleClose, open }) => {
    const { state: { dispatch } } = useChat()
    const { state: { user } } = useAuth()
    const navigate = useNavigate()

    const newChat = async () => {
        try {
            const res = await apiProvider.post('/api/chat/new-conversation', {
                user2: data.uid
            })

            if (res.status >= 200 || res.status < 300) {
                const { data: { data } } = res;

                openChat(dispatch, data, user)
                navigate(`/chat/${data.id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (!open) return null;

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
                <Box sx={{ p: 2 }}>
                    <Typography
                        variant="h6"
                        fontWeight={500}
                        gutterBottom
                        textAlign='center'
                    >
                        Es un Match!
                    </Typography>
                    <Typography
                        color='text.secondary'
                        variant="body1"
                        gutterBottom
                        textAlign='center'
                    >
                        Haz realizado un match con tu mascota de interés.
                        Haz click en el botón que se encuentra abajo para chatear.
                    </Typography>
                    <Box sx={{ p: 2 }}>
                        <Avatar sx={{
                            border: '2px solid #F59E0B',
                            height: '85px',
                            width: '85px'
                        }} src={getUserPhoto(data.img)} />
                    </Box>
                    <Box sx={{ p: 2, color: '#fff' }}>
                        <Button
                            variant="contained"
                            color="warning"
                            fullWidth
                            onClick={newChat}
                        >
                            Abrir chat
                        </Button>
                    </Box>
                </Box>
            </Box>
        </InstagramModal>
    );
}

export default MatchAlert
