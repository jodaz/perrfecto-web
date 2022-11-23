import * as React from 'react';
import getSearchParams from '../../utils/getSearchParams';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modals/Modal'
// Components
import SelectMethod from './SelectMethod';
import RecoverPasswordForm from './RecoverPasswordForm';
import SendCodeSuccessful from './SendCodeSuccessful';

export default function RecoverPassword({ location }) {
    const navigate = useNavigate()
    const methodSelected = getSearchParams(location, 'method');
    const isSuccessful = getSearchParams(location, 'success');
    console.log(location)
    React.useEffect(() => {
        if ((methodSelected != 'email' || methodSelected != 'sms') && methodSelected == null) {
            navigate('/recover-password')
        }
    }, [methodSelected])

    return (
        <Modal
            location={location}
            pathname='/recover-password'
            title="Recuperar contraseña"
        >
            {(!methodSelected) && (
                <SelectMethod />
            )}

            {(methodSelected && !isSuccessful) && (
                <RecoverPasswordForm method={methodSelected} />
            )}

            {(isSuccessful) && (
                <SendCodeSuccessful method={methodSelected} location={location} />
            )}
        </Modal>
    );
}
