import * as React from 'react';
import NewPasswordForm from './NewPasswordForm';
import Modal from '../Modal';
import getSearchParams from '../../../utils/getSearchParams';
import SuccessfulPasswordRecover from './SuccessfulPasswordRecover';

const NewPassword = ({ location }) => {
    const isSuccessful = getSearchParams(location, 'success');

    return (
        <Modal
            location={location}
            pathname='/recover-password/new'
            title="Recuperar contraseña"
        >
            {isSuccessful ? <SuccessfulPasswordRecover /> : <NewPasswordForm />}
        </Modal>
    );
}

export default NewPassword
