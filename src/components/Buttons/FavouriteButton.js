import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../context/GuestContext';
// Icons
import { ReactComponent as StarIcon } from '../../assets/icons/Star.svg'
import { apiProvider } from '../../api';

const FavouriteButton = ({ item, handleClick }) => {
    const { state: { isAuth } } = useAuth();
    const { dispatch } = useGuest();

    const submitLike = async (e) => {
        try {
            const res = await apiProvider.post(`api/fav/new`, {
                ad_id: item.id
            })

            if (res.status >= 200 && res.status < 300) {
                // const { data: { data } } = res;
            }
        } catch (error) {
            console.log("error ", error)
        }
        handleClick();
    }

    const action = e => {
        if (!isAuth) {
            openGuestWarning(dispatch, 'guardar un anuncio');
        } else {
            submitLike()
            e.stopPropagation();
        }
    }

    return (
        <IconButton sx={{
            background: '#fff',
            boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)'
        }} onClick={e => action(e)}>
            <StarIcon />
        </IconButton>
    );
}

export default FavouriteButton
