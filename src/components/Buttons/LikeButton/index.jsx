import * as React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../../context/GuestContext';
import { apiProvider } from '../../../api';
import LikeIconButton from './LikeIconButton';

const LikeButton = ({ item, sliderAction }) => {
    const [likesCount, setLikesCount] = React.useState(item.LikesCount);
    const { state: { isAuth } } = useAuth();
    const { dispatch } = useGuest();

    const handleSubmitLike = async () => {
        try {
            const res = await apiProvider.post('/api/publication/like', {
                ad_id: item.id
            })

            if (res.status >= 200 && res.status < 300) {
                const { data } = res;
                setLikesCount(prevState => {
                    if (data.msg == 'successfully') {
                        return prevState + 1
                    }
                    return prevState - 1
                });
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
            if (sliderAction) {
                sliderAction();
            }
        }
    }

    return <LikeIconButton likes={likesCount} onClick={action} />;
}

export default LikeButton
