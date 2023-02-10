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

export default function ChatView() {
    const [isBlockedUser, setIsBlockedUser] = React.useState(false)
    const [deleteChat, setDeleteChat] = React.useState(false)
    const [blockUser, setBlockUser] = React.useState(false)

    const toggleDeleteChat = () => setDeleteChat(!deleteChat);

    const toggleBlockUser = () => setBlockUser(!blockUser);

    const toggleIsBlockedUser = () => setIsBlockedUser(!isBlockedUser)

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
            rightIconComponent={renderMenu()}
            title={<Status />}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                {isBlockedUser && <BlockedUser unblockUser={toggleIsBlockedUser} />}
                <MessagesList />
                <DeleteChat
                    open={deleteChat}
                    handleClose={toggleDeleteChat}
                />
                <BlockUser
                    open={blockUser}
                    handleClose={toggleBlockUser}
                    sideAction={toggleIsBlockedUser}
                />
            </Box>
        </SettingsLayout>
    );
}
