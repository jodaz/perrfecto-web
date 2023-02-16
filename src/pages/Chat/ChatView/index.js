import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../../layouts/SettingsLayout';
import Menu from '../../../components/Menu'
import { Flag, Trash2, UserX } from 'lucide-react';
import Status from './Status';
import MessagesList from './MessagesList';
import DeleteChat from '../../../components/Modals/DeleteChat';
import BlockedUser from './BlockedUser';
import BlockUser from '../../../components/Modals/BlockUser';
import ChatForm from './ChatForm';
import { useParams } from 'react-router-dom';
import useEffectOnce from '../../../utils/useEffectOnce';
import { apiProvider } from '../../../api';
import LoadingIndicator from '../../../components/LoadingIndicator'
import { useChat, fetchMessages } from '../../../context/ChatContext';

export default function ChatView() {
    const [isBlockedUser, setIsBlockedUser] = React.useState(false)
    const [deleteChat, setDeleteChat] = React.useState(false)
    const [blockUser, setBlockUser] = React.useState(false)
    const { chatID } = useParams()
    const [data, setData] = React.useState(null)
    const { dispatch } = useChat()

    const toggleDeleteChat = () => setDeleteChat(!deleteChat);

    const toggleBlockUser = () => setBlockUser(!blockUser);

    const toggleIsBlockedUser = () => setIsBlockedUser(!isBlockedUser)

    const fetchData = async () => {
        try {
            const res = await apiProvider.get(`/api/chat/show-messages/${chatID}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setData(data);
                fetchMessages(dispatch, data.messages)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffectOnce(() => { fetchData() }, [])

    const renderMenu = () => (
        <Menu>
            {(!isBlockedUser) && (
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'unset',
                    textDecoration: 'none',
                }} onClick={toggleBlockUser}>
                    <UserX />
                    <Box sx={{ paddingLeft: '0.5rem' }}>
                        Bloquear usuario
                    </Box>
                </Box>
            )}
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'unset',
                textDecoration: 'none',
            }}>
                <Flag />
                <Box sx={{ paddingLeft: '0.5rem' }}>
                    Reportar usuario
                </Box>
            </Box>
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'unset',
                textDecoration: 'none',
            }} onClick={toggleDeleteChat}>
                <Trash2 />
                <Box sx={{ paddingLeft: '0.5rem' }}>
                    Borrar conversación
                </Box>
            </Box>
        </Menu>
    )

    return (
        <SettingsLayout
            rightIconComponent={data && renderMenu()}
            title={data && <Status receptor={data.receptor} />}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between'
            }}>
                {data ? (
                    <>
                        {isBlockedUser && <BlockedUser unblockUser={toggleIsBlockedUser} />}
                        <MessagesList />
                        <ChatForm receptor={data.receptor} />
                        <DeleteChat
                            open={deleteChat}
                            handleClose={toggleDeleteChat}
                        />
                        <BlockUser
                            open={blockUser}
                            handleClose={toggleBlockUser}
                            sideAction={toggleIsBlockedUser}
                        />
                    </>
                ): (
                    <Box alignSelf={'center'}>
                        <LoadingIndicator />
                    </Box>
                )}
            </Box>
        </SettingsLayout>
    );
}
