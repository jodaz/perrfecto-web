import * as React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../../context/GuestContext';
import { apiProvider } from '../../../api';
import LikeIconButton from './LikeIconButton';

const LikeButton = ({ item, sliderAction }) => {
    const { state: { isAuth } } = useAuth();
    const { dispatch } = useGuest();

    const handleSubmitLike = async () => {
        try {
            const res = await apiProvider.post('/api/publication/like', {
                ad_id: item.id
            })
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
            if (sliderAction) {
                sliderAction();
            }
        }
    }

    return <LikeIconButton likes={item.LikesCount} onClick={action} />;
}

export default LikeButton
