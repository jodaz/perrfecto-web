import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../context/GuestContext';
// Icons
import { ReactComponent as StarIcon } from '../../assets/icons/Star.svg'

const FavouriteButton = () => {
    const { state: { isAuth } } = useAuth();
    const { dispatch } = useGuest();

    const action = () => {
        if (!isAuth) {
            openGuestWarning(dispatch, 'guardar un anuncio');
        } else {
            console.log("Like");
        }
    }

    return (
        <IconButton sx={{
            background: '#fff',
            boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)'
        }} onClick={action}>
            <StarIcon />
        </IconButton>
    );
}

export default FavouriteButton
