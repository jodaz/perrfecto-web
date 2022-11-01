import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import DialogTitle from '../DialogTitle'
// Components
import SelectMethod from './SelectMethod';
import getSearchParams from '../../utils/getSearchParams';
import RecoverPasswordForm from './RecoverPasswordForm';
import SendCodeSuccessful from './SendCodeSuccessful';

export default function RecoverPassword({ location }) {
    const navigate = useNavigate()
    const methodSelected = getSearchParams(location, 'method');
    const isSuccessful = getSearchParams(location, 'success');

    React.useEffect(() => {
        if ((methodSelected != 'email' || methodSelected != 'sms') && methodSelected == null) {
            navigate('/recover-password')
        }
    }, [methodSelected])

    const handleClose = () => navigate('/')

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/recover-password'}
        >
            <DialogTitle onClose={handleClose} />
            <Box sx={{
                m: 1,
                display: 'flex',
                width: '350px',
                height: '350px',
                p: 3,
                color: theme => theme.palette.text.secondary
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box component='h2' margin='0 0 1rem 0' color="text.primary">
                        Recuperar contraseña
                    </Box>
                    {(!methodSelected) && (
                        <SelectMethod />
                    )}

                    {(methodSelected && !isSuccessful) && (
                        <RecoverPasswordForm />
                    )}

                    {(isSuccessful) && (
                        <SendCodeSuccessful method={methodSelected} />
                    )}
                </Box>
            </Box>
        </Dialog>
    );
}
