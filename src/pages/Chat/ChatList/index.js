import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import SearchBox from '../../../components/SearchBox';
import ChatCard from './ChatCard';
import { apiProvider } from '../../../api';
import useEffectOnce from '../../../utils/useEffectOnce';
import { useChat } from '../../../context/ChatContext';
import { useAuth } from '../../../context/AuthContext';
import GuestDog from '../../../assets/images/GuestDog1.png'
import GuestMessage from '../../../components/Alerts/GuestMessage';

const ChatList = () => {
    const { state: { users } } = useChat()
    const [messages, setMessages] = React.useState([null, null, null, null, null])

    const fetchMessages = async ({ search }) => {
        try {
            const res = await apiProvider.get('/api/chat/conversations',{
                params: {
                    filter: search
                }
            })

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setMessages(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffectOnce(() => {
        fetchMessages()
    })

    return (
        <Box p={2}>
            <Stack direction='column' spacing={2}>
                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Mensajes
                </Typography>
                <SearchBox filter={data => fetchMessages(data)} />
            </Stack>
            <Box mt={3} />
            <List sx={{ width: '100%' }}>
                {messages.map((message, index) => (
                    <ChatCard
                        data={message}
                        index={index}
                        arrUsers={users}
                    />
                ))}
                {!(messages.length) && (
                    <Typography
                        variant="subtitle1"
                    >
                        Actualmente no tienes conversaciones.
                    </Typography>
                )}
            </List>
        </Box>
    );
}

const ChatListView = () => {
    const { state: { isAuth } } = useAuth()

    if (!isAuth) {
        return (
            <GuestMessage
                Image={GuestDog}
                title='¿Nada por aquí?'
                subtitle='Intercambia mensajes, fotos y videos con personas cerca de ti.'
            />
        )
    }

    return <ChatList />
}

export default ChatListView
