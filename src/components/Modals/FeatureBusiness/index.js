import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Star } from 'lucide-react';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material';
import SuccessfulFeatureBusiness from './SuccessfulFeatureBusiness';
import { apiProvider } from '../../../api';

const FeatureBusiness = ({ open, handleClose, closeBusiness, item }) => {
    const [onSubmit, setOnSubmit] = React.useState(false);
    const [success, setSuccess] = React.useState(false)

    const handleSubmit = async () => {
        setOnSubmit(true);
        try {
            const res = await apiProvider.post('/api/announcement/new-featured', {
                id_ann: item.id
            })

            if (res.status >= 200 && res.status < 300) {
                setOnSubmit(false)
                setSuccess(true)
            }

            return res;
        } catch (e) {
            console.log(e);
        }
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
            {(success) ? <SuccessfulFeatureBusiness handleClose={closeBusiness}/>
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
                        ? <SuccessfulFeatureBusiness />
                    : (
                        <>
                            <Box sx={{ p: 1, textAlign: 'center' }}>
                                <Star size={48} color="#F59E0B" />
                            </Box>
                            <Box sx={{ p: 1 }}>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    fontWeight={500}
                                >
                                    ¿Estás seguro que deseas destacar su negocio?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                >
                                    Al destacar su negocio, se monstrará en la pantalla principal del Market
                                </Typography>
                                <Stack direction="column">
                                    <Button color="primary" disabled={onSubmit} onClick={handleSubmit}>
                                        Destacar negocio
                                    </Button>
                                    <Button onClick={handleClose} disabled={onSubmit} sx={{
                                        color: '#858585',
                                        '&:hover': {
                                            backgroundColor: `${alpha('#858585', 0.1)}`
                                        }
                                    }}>
                                        Cancelar
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

export default FeatureBusiness
