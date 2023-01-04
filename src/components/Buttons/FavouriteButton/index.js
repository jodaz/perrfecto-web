import * as React from 'react';
import StarIconButton from './StarIconButton';
import { useAuth } from '../../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../../context/GuestContext';
// Icons
import { useFavourites, addFavourite } from '../../../context/FavouriteContext';

const FavouriteButton = ({ item, handleClick }) => {
    const { state: { isAuth } } = useAuth();
    const { dispatch } = useGuest();
    const { dispatch: dispatchFavourite } = useFavourites()

    const action = async e => {
        e.stopPropagation();
        if (!isAuth) {
            openGuestWarning(dispatch, 'guardar un anuncio');
        } else {
            if (handleClick) {
                handleClick();
            }
            await addFavourite(dispatchFavourite, item);
        }
    }

    return <StarIconButton onClick={e => action(e)} />
}

export default FavouriteButton
