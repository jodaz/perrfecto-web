import * as React from 'react';
import ProblemDescriptionForm from './ProblemDescriptionForm';
import getSearchParams from '../../../utils/getSearchParams'
import AccountContactInformation from './AccountContactInformation';
import Modal from '../Modal'
import SuccessfulApplication from './SuccessfulApplication';

const AccountUnlock = ({ location }) => {
    const contactInfo = getSearchParams(location, 'contact');
    const success = getSearchParams(location, 'success');

    return (
        <Modal
            title={success ? '' : 'Solicitud de desbloqueo de cuenta'}
            pathname='/account/unlock'
            location={location}
            closeModal={success && '/'}
        >
            {contactInfo ? (
                <AccountContactInformation location={location} />
            ) : success ? (
                <SuccessfulApplication />
            ) : (
                <ProblemDescriptionForm />
            )}
        </Modal>
    );
}

export default AccountUnlock
