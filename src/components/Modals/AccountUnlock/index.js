import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ProblemDescriptionForm from './ProblemDescriptionForm';
import getSearchParams from '../../../utils/getSearchParams'
import Box from '@mui/material/Box';
import AccountContactInformation from './AccountContactInformation';
import Modal from '../Modal'

const AccountUnlock = ({ location }) => {
    const navigate = useNavigate()
    const contactInfo = getSearchParams(location, 'contact');

    return (
        <Modal
            title='Solicitud de desbloqueo de cuenta'
            pathname='/account/unlock'
            location={location}
        >
            {contactInfo ? (
                <AccountContactInformation location={location} />
            ) : (
                <ProblemDescriptionForm />
            )}
        </Modal>
    );
}

export default AccountUnlock
