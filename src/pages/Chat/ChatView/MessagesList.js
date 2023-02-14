import * as React from 'react';
import Box from '@mui/material/Box';
import { socket, listenMessages } from '../../../utils/socket';

const messagesArray = [
    {
        id: 1,
        isReceptor: false,
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        created_at: new Date(),
        User: {
            name: 'Don',
            lastName: 'Diablo',
            user_picture: '/images/samples/Pupi.png'
        }
    },
    {
        id: 2,
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        created_at: new Date( Date.now() - 1000 * 60 ), // 45 min
        User: {
            name: 'Don',
            lastName: 'Diablo',
            user_picture: '/images/samples/Pupi.png'
        },
        isReceptor: false
    },
    {
        id: 3,
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        created_at: new Date(2023, 1, 4, 10, 33, 1), // Unos dias
        User: {
            name: 'Deadmau5',
            user_picture: '/images/samples/Pupi.png'
        },
        isReceptor: true
    },
    {
        id: 4,
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        created_at: new Date(2023, 0, 28, 10, 33, 1), // Unos dias
        User: {
            name: 'Deadmau5',
            user_picture: '/images/samples/Pupi.png'
        },
        isReceptor: false
    },
    {
        id: 5,
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        created_at: new Date(2023, 0, 4, 20, 33, 1), // 2 sem
        User: {
            name: 'Deadmau5',
            user_picture: '/images/samples/Pupi.png'
        },
        isReceptor: true
    },
]

export default function MessagesList() {
    const [messages, setMessages] = React.useState([null, null, null, null, null])

    React.useEffect(() => {
        setInterval(() => {
            setMessages(messagesArray)
        }, 5000);
    }, [])

    React.useEffect(() => {
        socket.on('mensajePrivado', res => console.log("Mensajes", res))

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
