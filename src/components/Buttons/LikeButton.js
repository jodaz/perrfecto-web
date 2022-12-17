import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useAuth } from '../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../context/GuestContext';
// Icons
import { ReactComponent as PawIcon } from '../../assets/icons/Paw.svg'

const LikeButton = ({ likes, sliderAction }) => {
    const { state: { isAuth } } = useAuth();
    const { dispatch } = useGuest();

    const action = e => {
        if (!isAuth) {
            openGuestWarning(dispatch, 'dar me gusta');
        } else {
            sliderAction();
        }
        e.stopPropagation()
    }

    return (
        <Badge
            badgeContent={`${likes}`}
            color="primary"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            sx={{
                '& .MuiBadge-badge': {
                    height: '25px !important',
                    width: '25px !important',
                    borderRadius: '100px',
                    color: '#fff',
                    backgroundColor: theme => theme.palette.primary.main
                }
            }}
        >
            <IconButton sx={{
                background: '#fff',
                boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)'
            }} onClick={action}>
                <PawIcon />
            </IconButton>
        </Badge>
    );
}

export default LikeButton
