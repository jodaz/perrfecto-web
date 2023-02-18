import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import styled from '@emotion/styled';
import { Trash } from 'lucide-react';

const Picture = data => (
    <Avatar
        src={`${data.User.user_picture}`}
        sx={{
            height: '50px',
            width: '50px'
        }}
    />
)

const GeneralMessage = styled(Box)(() => ({
    position: 'relative',
    padding: '0.5rem 1rem',
    maxWidth: '50%',
    width: 'fit-content',
    marginBottom: '2px',
    borderRadius: '8px',
    fontWeight: 400,
    gap: '10px'
}))

const ReceivedMessage = styled(GeneralMessage)(() => ({
    backgroundColor: '#35414C',
    alignSelf: 'start',
    borderBottomLeftRadius: 0,
    color: '#fff',
    marginLeft: '0.5rem'
}))

const SentMessage = styled(GeneralMessage)(() => ({
    backgroundColor: '#ECECEC',
    borderBottomRightRadius: 0,
    alignSelf: 'end',
    marginRight: '0.5rem',
    position: 'relative'
}))

const UserMessageCard = ({ message, isReceptor, toggleDeleteMessage }) => {
    const [showDelete, setShowDelete] = React.useState(false);

    const toggleShowDelete = () => setShowDelete(!showDelete)

    if (isReceptor) {
        return (
            <ReceivedMessage>
                <Typography textAlign='left'>
                    {message.message}
                </Typography>
            </ReceivedMessage>
        );
    }

    return (
        <SentMessage
            onMouseEnter={toggleShowDelete}
            onMouseLeave={toggleShowDelete}
        >
            {showDelete && (
                <IconButton sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0
                }} onClick={() => toggleDeleteMessage(message)}>
                    <Trash size={16} strokeWidth={3} />
                </IconButton>
            )}
            <Typography
                textAlign='left'
                color="text.primary"
                marginRight='20px'
            >
                {message.message}
            </Typography>
        </SentMessage>
    );
}

export default UserMessageCard
