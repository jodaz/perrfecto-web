import * as React from 'react';
import Box from '@mui/material/Box';
import { socket, listenMessages } from '../../../utils/socket';

export default function MessagesList({ data }) {
    const [messages, setMessages] = React.useState(data)

    React.useEffect(() => {
        listenMessages(data => {
            setMessages(prevState => [...prevState, data])
        })

        return () => {
            socket.off('mensajePrivado')
        }
    }, [socket])

    return (
        <Box p={2}>
            <Box sx={{
                width: '200px',
                margin: '0 auto',
                textAlign: 'center',
                fontWeight: 500,
                color: theme => theme.palette.text.tertiary,
                fontSize: '14px'
            }}>
                Pupi ha iniciado una conversación contigo
            </Box>
        </Box>
    );
}
