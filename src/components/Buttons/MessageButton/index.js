import * as React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { openGuestWarning, useGuest } from '../../../context/GuestContext';
import MessageIconButton from './MessageIconButton';

const MessageButton = ({ sliderAction }) => {
    const { state: { isAuth } } = useAuth();
    const { dispatch } = useGuest();

    const action = e => {
        e.stopPropagation()
        if (!isAuth) {
            openGuestWarning(dispatch, 'enviar mensajes');
        } else {
            if (sliderAction) {
                sliderAction();
            }
        }
    }

    return <MessageIconButton active={true} onClick={action} />;
}

export default MessageButton
