import * as React from 'react';
import InstagramModal from '../InstagramModal';
import AccountLockedAlert from './AccountLockedAlert';
import { useNavigate } from 'react-router-dom';

const AccountLocked = ({ location }) => {
    const navigate = useNavigate()

    return (
        <InstagramModal
            handleClose={() => navigate(-1)}
            open={location.pathname == '/account/locked'}
        >
            <AccountLockedAlert />
        </InstagramModal>
    );
}

export default AccountLocked
