import * as React from 'react';
import Box from '@mui/material/Box';
import { socket, listenMessages } from '../../../utils/socket';
import UserMessageCard from './UserMessageCard';
import { useAuth } from '../../../context/AuthContext';
import { useChat, setMessage } from '../../../context/ChatContext';

export default function MessagesList() {
    const boxElem = React.useRef(null)
    const { state: { user } } = useAuth()
    const { state: { messages }, dispatch } = useChat()

    React.useEffect(() => {
        listenMessages(data => setMessage(dispatch, data))

        return () => {
            socket.off('mensajePrivado')
        }
    }, [socket])

    React.useEffect(() => {
        // scroll to bottom
        if (boxElem) {
            boxElem.current.scroll({ top: boxElem.current.scrollHeight, behavior: 'smooth' });

            boxElem.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    return (
        <Box sx={{
            display: 'flex',
            flex: '1 1 0',
            width: '100%',
            textAlign: 'center',
            overflowY: 'scroll',
            height: 'inherit',
            flexDirection: 'column',
            paddingBottom: '1rem'
        }} ref={boxElem}>
            {messages.map(({ message, uid }) => (
                <UserMessageCard
                    message={message}
                    isReceptor={uid != user.id}
                />
            ))}
        </Box>
    );
}
