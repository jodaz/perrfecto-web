import * as React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../../context/GuestContext';
import { apiProvider } from '../../../api';
import { ThumbsUp } from 'lucide-react';
import IconButton from '@mui/material/IconButton';

const LikePostButton = ({ id, type }) => {
    const { state: { isAuth } } = useAuth();
    const { dispatch } = useGuest();

    const handleSubmitLike = async (event) => {
        try {
            if (type == 'post') {
                await apiProvider.post('/api/blog/like', {
                    blog_id: id
                })
            } else {
                await apiProvider.post('/api/blog/like-commentary', {
                    commentary_id: id
                })
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
            <ThumbsUp color="#5E5E5E" />
        </IconButton>
    )
}

export default LikePostButton
