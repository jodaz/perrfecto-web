import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Skeleton from "@mui/material/Skeleton";
import { alpha } from '@mui/material';
import Badge from '@mui/material/Badge';
import getUserPhoto from '../../../utils/getUserPhoto';
import truncateString from '../../../utils/truncateString';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { es } from 'date-fns/locale'
import LinkBehavior from '../../../components/LinkBehavior';
import styled from '@emotion/styled';

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
    marginRight: '0.5rem'
}))

const UserMessageCard = ({ message, isReceptor }) => {
    if (isReceptor) {
        return (
            <SentMessage>
                <Typography>
                    {message}
                </Typography>
            </SentMessage>
        );
    }

    return (
        <ReceivedMessage>
            <Typography>
                {message}
            </Typography>
        </ReceivedMessage>
    );
}

export default UserMessageCard
