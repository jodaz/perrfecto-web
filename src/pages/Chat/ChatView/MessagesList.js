import * as React from 'react';
import Box from '@mui/material/Box';
import { socket, listenMessages } from '../../../utils/socket';
import UserMessageCard from './UserMessageCard';
import { useAuth } from '../../../context/AuthContext';
import { useChat, setMessage } from '../../../context/ChatContext';

export default function MessagesList({ prevMessages }) {
    const { state: { user } } = useAuth()
    const { state: { messages }, dispatch } = useChat()

    React.useEffect(() => {
        listenMessages(data => setMessage(dispatch, {
            message: data.mensaje,
            uid: data.uid
        }))

        return () => {
            socket.off('mensajePrivado')
        }
    }, [socket])

    return (
        <Box sx={{
            display: 'flex',
            flex: '1 1 0',
            width: '100%',
            textAlign: 'center',
            fontWeight: 500,
            color: theme => theme.palette.text.tertiary,
            fontSize: '14px',
            overflowY: 'scroll',
            height: 'inherit',
            flexDirection: 'column',
            paddingBottom: '1rem'
        }}>
            {messages.map(({ message, uid }) => (
                <UserMessageCard
                    message={message}
                    isReceptor={uid != user.id}
                />
            ))}
        </Box>
    );
}
