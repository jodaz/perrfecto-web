import * as React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../../context/GuestContext';
import { apiProvider } from '../../../api';
import { ThumbsUp } from 'lucide-react';
import IconButton from '@mui/material/IconButton';

const LikePostButton = ({ id, type, liked }) => {
    const [isLiked, setIsLiked] = React.useState(liked)
    const { state: { isAuth } } = useAuth();
    const { dispatch } = useGuest();

    const handleSubmitLike = async () => {
        let response = null;

        try {
            switch (type) {
                case 'post': {
                    response = await apiProvider.post('/api/blog/like', {
                        blog_id: id
                    })
                    break;
                }
                case 'comment': {
                    response = await apiProvider.post('/api/blog/like-commentary', {
                        commentary_id: id
                    })
                    break;
                }
                case 'reply': {
                    response = await apiProvider.post('/api/blog/like-reply-blog', {
                        reply_id: id
                    })
                    break;
                }
            }

            if (response) {
                if (response.status >= 200 && response.status < 300) {
                    setIsLiked(true)
                }
            }
        } catch (error) {
            console.log(error)
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
        <IconButton onClick={action}>
            <ThumbsUp color={isLiked ? '#A167C9' : "#5E5E5E"} />
        </IconButton>
    )
}

export default LikePostButton
