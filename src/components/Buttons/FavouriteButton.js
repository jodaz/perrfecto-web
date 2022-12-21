import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../context/GuestContext';
// Icons
import { ReactComponent as StarIcon } from '../../assets/icons/Star.svg'
import { useFavourites, addFavourite } from '../../context/FavouriteContext';

const FavouriteButton = ({ item, handleClick }) => {
    const { state: { isAuth } } = useAuth();
    const { dispatch } = useGuest();
    const { dispatch: dispatchFavourite } = useFavourites()

    const action = async e => {
        e.stopPropagation();
        if (!isAuth) {
            openGuestWarning(dispatch, 'guardar un anuncio');
        } else {
            await addFavourite(dispatchFavourite, item);
            handleClick();
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
