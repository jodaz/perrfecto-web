import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../../DialogTitle';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import RegisterBusinessForm from './RegisterBusinessForm';
// Other components

const RegisterBusiness = ({ location }) => {
    const navigate = useNavigate()
    const handleClose = () => navigate('/business')

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/business/register'}
        >
            <Box sx={{
                display: 'flex',
                width: '800px',
                height: 'fit-content',
                color: theme => theme.palette.text.secondary
            }}>
                <Box sx={{
                    flex: 1,
                    backgroundColor: '#A167C9'
                }}>

                </Box>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <DialogTitle onClose={handleClose} />
                    <RegisterBusinessForm />
                </Box>
            </Box>
        </Dialog>
    );
}

export default RegisterBusiness
