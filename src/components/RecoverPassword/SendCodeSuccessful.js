import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinkBehavior from '../LinkBehavior';
// Icons
import { ReactComponent as EmailSendGreenIcon } from '../../assets/icons/EmailSendGreen.svg'
import { ReactComponent as MessagePhoneGreenIcon } from '../../assets/icons/MessagePhoneGreen.svg'

const SendCodeSuccessful = ({
    method,
    location
}) => (
    <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    }}>
        <Box sx={{ m: 1, flex: 1, p: 1 }}>
            <Typography variant='h6' align='center' color='text.primary'>
                {(method == 'email') ? (
                    <>Email enviado</>
                ) : (
                    <>SMS enviado</>
                )}
            </Typography>
            <Box sx={{ p: 1, textAlign: 'center' }}>
                {(method == 'email') ? (
                    <EmailSendGreenIcon />
                ) : (
                    <MessagePhoneGreenIcon />
                )}
            </Box>
            <Box sx={{ p: 1 }}>
                <Typography align='center'>
                    Hemos enviado un email al correo lu*************ro@gmail.com con un código
                    para que puedas recuperar tu contraseña ;)
                </Typography>
            </Box>
            <Box sx={{ p: 1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    component={LinkBehavior}
                    to={`/recover-password/code?method=${method}`}
                    state={location.state}
                >
                    Continuar
                </Button>
            </Box>
        </Box>
    </Box>
);

export default SendCodeSuccessful
