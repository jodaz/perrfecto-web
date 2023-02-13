import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import SearchBox from '../../../components/SearchBox';
import UserMessageCard from './UserMessageCard';
import { apiProvider } from '../../../api';
import useEffectOnce from '../../../utils/useEffectOnce';

export default function ChatList() {
    const [messages, setMessages] = React.useState([null, null, null, null, null])

    const fetchMessages = async () => {
        try {
            const res = await apiProvider.get('/api/chat/conversations')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setMessages(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffectOnce(() => { fetchMessages() }, [])

    return (
        <Box p={2}>
            <Stack direction='column' spacing={2}>
                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Mensajes
                </Typography>
                <SearchBox filter={data => console.log(data)} />
            </Stack>
            <Box mt={3} />
            <List sx={{ width: '100%' }}>
                {messages.map((message, index) => <UserMessageCard data={message} index={index} />)}
            </List>
        </Box>
    );
}
