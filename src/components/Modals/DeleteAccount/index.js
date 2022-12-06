import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { XSquare } from 'lucide-react';
import Stack from '@mui/material/Stack';

const DeleteAccount = ({ open, handleClose }) => {
    const submitDelete = async (data) => {
        // setErrorAlert('');
        // try {
        //     const res = await apiProvider.post('/api/auth', {
        //         ...data
        //     })

        //     if (res.status >= 200 && res.status < 300) {
        //         const { data } = res;
        //         loginUser(dispatch, data)

        //         if (data.data.role == 'user') {
        //             navigate('/detect-location')
        //         } else {
        //             navigate('/home')
        //         }
        //     }
        // } catch (error) {
        //     if (error.response.data.msg) {
        //         const message = error.response.data.msg;

        //         if (message.includes('The user does not exist with that email')) {
        //             setErrorAlert('No estás registrado. Crea una cuenta para poder comenzar en TinderDogs.')
        //         }
        //         if (message.includes('The user does not exist with that phone')) {
        //             setErrorAlert('No estás registrado. Crea una cuenta para poder comenzar en TinderDogs.')
        //         }
        //         if (message.includes('Wrong Password')) {
        //             setError('password', {
        //                 type: 'invalid'
        //             })
        //         }
        //     }
        // }
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
        >
            <Box sx={{
                m: 1,
                display: 'flex',
                width: 'fit-content',
                height: 'fit-content',
                p: 3,
                flexDirection: 'column',
                color: theme => theme.palette.text.secondary
            }}>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <XSquare size={48} />
                </Box>
                <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        ¿Estás seguro que deseas eliminar tu cuenta ?
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Al eliminar tu cuenta se borrarán todos tus datos,
                        <br />
                        fotos, lista de favoritos, mensajes y demás...
                        <br />
                        de manera permanente y ya no podrá ser recuperado
                    </Typography>
                    <Stack direction="column">
                        <Button color="error" onClick={submitDelete}>
                            Eliminar cuenta
                        </Button>
                        <Button color="info" onClick={handleClose}>
                            Volver
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Dialog>
    );
}

export default DeleteAccount
