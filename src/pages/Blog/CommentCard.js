import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import getUserPhoto from '../../utils/getUserPhoto';
import LikePostButton from '../../components/Buttons/LikePostButton';
import ReplyCard from './ReplyCard';

const CommentCard = ({
    id,
    User,
    msg,
    createdAt,
    ReplyBlogs = [],
    LikesCount = 0,
    openReply
}) => (
    <Box sx={{
        p: 1,
        display: 'flex',
        border: 'none',
        textDecoration: 'none',
        color: 'unset',
        transition: '0.3s',
    }}>
        <Avatar src={User.img_profile && getUserPhoto(User.img_profile)} />
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            px: { xs: 0, sm: 2 }
        }}>
            <Box>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={700}
                    sx={{
                        textAlign: { xs: 'center', sm: 'start' },
                        mt: { xs: 1.5, sm: 0 },
                    }}
                >
                    {`${User.name} `}
                    {User.lastName && `${User.lastName}`}
                </Typography>
                <Typography
                    component="div"
                    variant="caption"
                    color="text.tertiary"
                    fontWeight={500}
                    sx={{ textAlign: { xm: 'center', sm: 'start' }, textTransform: 'capitalize' }}
                >
                    {format(new Date(createdAt), 'MMMM d, y', { locale: es })}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={400}
                    sx={{
                        textAlign: { xs: 'center', sm: 'start' },
                        mt: { xs: 1.5, sm: 0 },
                    }}
                >
                    {msg}
                </Typography>
            </Box>
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    justifyContent: { xs: 'space-between', sm: 'flex-start' },
                    alignItems: 'center'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LikePostButton id={id} type='comment' />
                    <Typography variant="body2" ml={1} color="#5E5E5E">
                        {LikesCount}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={openReply}>
                        <MessageSquare color="#5E5E5E" />
                    </IconButton>
                    <Typography variant="body2" ml={1} color="#5E5E5E">
                        {ReplyBlogs.length}
                    </Typography>
                </Box>
            </Stack>
            {!!(ReplyBlogs.length) && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    height: '100%'
                }}>
                    {ReplyBlogs.map(reply => <ReplyCard {...reply} />)}
                </Box>
            )}
        </Box>
    </Box>
);

export default CommentCard
