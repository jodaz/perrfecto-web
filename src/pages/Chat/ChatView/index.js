import * as React from 'react';
import Box from '@mui/material/Box';
import SettingsLayout from '../../../layouts/SettingsLayout';
import Menu from '../../../components/Menu'
import { ChevronLeft, Flag, Trash2 } from 'lucide-react';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import Status from './Status';
import MessagesList from './MessagesList';
import DeleteChat from '../../../components/Modals/DeleteChat';
import BlockedUser from './BlockedUser';
import BlockUser from '../../../components/Modals/BlockUser';
import ChatForm from './ChatForm';
import { useNavigate, useParams } from 'react-router-dom';
import useEffectOnce from '../../../utils/useEffectOnce';
import { apiProvider } from '../../../api';
import LoadingIndicator from '../../../components/LoadingIndicator'
import { useChat, fetchMessages } from '../../../context/ChatContext';
import ReportUser from '../../../components/Modals/ReportUser';

export default function ChatView() {
    const navigate = useNavigate()
    const [isBlockedUser, setIsBlockedUser] = React.useState(false)
    const [deleteChat, setDeleteChat] = React.useState(false)
    const [blockUser, setBlockUser] = React.useState(false)
    const [reportUser, setReportUser] = React.useState(false)
    const { chatID } = useParams()
    const [data, setData] = React.useState(null)
    const { state: {
        isLoading,
        isChatOpen,
        receptor
    }, dispatch } = useChat()

    const toggleDeleteChat = () => setDeleteChat(!deleteChat);

    const toggleBlockUser = () => setBlockUser(!blockUser);

    const toggleReportUser = () => setReportUser(!reportUser);

    const toggleIsBlockedUser = () => setIsBlockedUser(!isBlockedUser)

    const fetchData = async () => {
        try {
            const res = await apiProvider.get(`/api/chat/show-messages/${chatID}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setData(data);
                setIsBlockedUser(data.is_locked)

                // fetchMessages(dispatch, data.messages)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // React.useEffect(() => { fetchData() }, [chatID])

    const renderMenu = () => (
        <Menu>
            {!isBlockedUser && (
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'unset',
                    textDecoration: 'none',
                }} onClick={toggleBlockUser}>
                    <PersonOffOutlinedIcon />
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
            }} onClick={toggleReportUser}>
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
            rightIconComponent={isChatOpen && renderMenu()}
            title={isChatOpen && <Status receptor={receptor} />}
            handleGoBack={() => navigate('/chat')}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
                backgroundColor: '#fff'
            }}>
                {data ? (
                    <>
                        <MessagesList  />
                        {isBlockedUser && (
                            <BlockedUser
                                item={data}
                                sideAction={fetchData}
                            />
                        )}
                        <ChatForm
                            receptor={data.receptor}
                            disabled={isBlockedUser}
                        />
                        <DeleteChat
                            open={deleteChat}
                            handleClose={toggleDeleteChat}
                            item={data}
                        />
                        <BlockUser
                            open={blockUser}
                            handleClose={toggleBlockUser}
                            sideAction={fetchData}
                            item={data}
                        />
                        <ReportUser
                            open={reportUser}
                            handleClose={toggleReportUser}
                            item={data}
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
