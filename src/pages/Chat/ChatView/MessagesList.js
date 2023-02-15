import * as React from 'react';
import Box from '@mui/material/Box';
import { socket, listenMessages } from '../../../utils/socket';
import UserMessageCard from './UserMessageCard';
import { useAuth } from '../../../context/AuthContext';

export default function MessagesList({ prevMessages }) {
    const { state: { user } } = useAuth()
    const [messages, setMessages] = React.useState(prevMessages)

    React.useEffect(() => {
        listenMessages(data => {
            setMessages(prevState => [...prevState, data])
        })

        return () => {
            socket.off('mensajePrivado')
        }
    }, [socket])

    console.log(messages)

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
                    isReceptor={user.id == uid}
                />
            ))}
        </Box>
    );
}
