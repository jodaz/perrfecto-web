import * as React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../../context/GuestContext';
import { apiProvider } from '../../../api';
import { ThumbsUp } from 'lucide-react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { likeBlog, likeReply, likeCommentBlog } from '../../../utils/socket';

const LikePostButton = ({ id, type, LikesBlog = [], LikesCount = 0 }) => {
    const [likes, setLikes] = React.useState(LikesCount)
    const [isLiked, setIsLiked] = React.useState(LikesBlog.length)
    const { state: { isAuth, user } } = useAuth();
    const { dispatch } = useGuest();

    const handleSubmitLike = async () => {
        let response = null;

        try {
            switch (type) {
                case 'post': {
                    response = await likeBlog({
                        blog: id,
                        user: user.id
                    })
                    break;
                }
                case 'reply': {
                    response = await likeReply({
                        reply: id,
                        user: user.id
                    })
                    break;
                }
                case 'comment': {
                    response = await likeCommentBlog({
                        comment: id,
                        user: user.id
                    })
                    break;
                }
            }
        } catch (error) {
            console.log(error)
        }

        if (response) {
            const { msg, likeCount } = response;

            setIsLiked(!msg ? true : false)
            setLikes(likeCount)
        }
    }

    const action = e => {
        e.stopPropagation()
        if (!isAuth) {
            openGuestWarning(dispatch, 'dar me gusta');
        } else {
            handleSubmitLike();
        }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={action}>
                <ThumbsUp color={isLiked ? '#A167C9' : "#5E5E5E"} />
            </IconButton>
            <Typography variant="body2" ml={1} color="#5E5E5E">
                {likes}
            </Typography>
        </Box>
    )
}

export default LikePostButton
