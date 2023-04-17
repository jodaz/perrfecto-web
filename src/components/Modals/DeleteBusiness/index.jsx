import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Trash2 } from 'lucide-react';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material';
import SuccessfulDeleteBusiness from './SuccessfulDeleteBusiness';
import { renewToken, useAuth } from '../../../context/AuthContext';
import { apiProvider } from '../../../api';
import { useNavigate } from 'react-router-dom';

const DeleteBusiness = ({ open, item, handleClose }) => {
    const { state: { user }, dispatch } = useAuth()
    const [onSubmit, setOnSubmit] = React.useState(false);
    const [success, setSuccess] = React.useState(false)
    const navigate = useNavigate()

    const handleDelete = async () => {
        setOnSubmit(true);
        try {
            const res = await apiProvider.delete(`/api/business-ann/${item.id}`)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user);
                navigate('/businesses')
            }

            return res;
        } catch (e) {
            console.log(e);
        }
        setSuccess(true)
    }

    if (!open) return null;

    return (
        <InstagramModal
            handleClose={() => {
                handleClose()
                setOnSubmit(false)
            }}
            open={open}
        >
            {(success) ? <SuccessfulDeleteBusiness handleClose={handleClose}/>
            : (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    p: 2,
                    maxWidth: '280px',
                    alignItems: 'center',
                    background: '#fff',
                    borderRadius: 4,
                    marginRight: '1rem',
                    textAlign: 'center',
                    color: theme => theme.palette.text.secondary,
                    background: '#fff'
                }}>
                    {(success)
                        ? <SuccessfulDeleteBusiness />
                    : (
                        <>
                            <Box sx={{ p: 1, textAlign: 'center' }}>
                                <Trash2 size={48} />
                            </Box>
                            <Box sx={{ p: 1 }}>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    fontWeight={500}
                                >
                                    ¿Estás seguro que deseas eliminar su negocio?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                >
                                    Al eliminar tu negocio se borrarán todos la información, fotos y demás de manera permanente y ya no podrá ser recuperada
                                </Typography>
                                <Stack direction="column">
                                    <Button color="error" disabled={onSubmit} onClick={handleDelete}>
                                        Eliminar negocio
                                    </Button>
                                    <Button onClick={handleClose} disabled={onSubmit} sx={{
                                        color: '#858585',
                                        '&:hover': {
                                            backgroundColor: `${alpha('#858585', 0.1)}`
                                        }
                                    }}>
                                        Volver
                                    </Button>
                                </Stack>
                            </Box>
                        </>
                    )}
                </Box>
            )}
        </InstagramModal>
    );
}

export default DeleteBusiness
