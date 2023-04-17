import * as React from 'react';
import InstagramModal from '../InstagramModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AlertTriangle } from 'lucide-react';
import Stack from '@mui/material/Stack';
import LinkBehavior from '../../LinkBehavior'
import { useNavigate } from 'react-router-dom';

const AccountLocked = ({ location }) => {
    const navigate = useNavigate()

    return (
        <InstagramModal
            handleClose={() => navigate(-1)}
            open={location.pathname == '/account/locked'}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                p: 2,
                minWidth: '280px',
                maxWidth: '280px',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 4,
                marginRight: '1rem',
                textAlign: 'center',
                color: theme => theme.palette.text.secondary,
            }}>
                <Stack
                    spacing={1}
                    padding={2}
                    direction="column"
                >
                    <Box sx={{ p: 1, textAlign: 'center' }}>
                        <AlertTriangle size={48} />
                    </Box>
                    <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight={500}
                    >
                        Cuenta bloqueada
                    </Typography>
                    <Typography
                        variant="body2"
                        gutterBottom
                    >
                        Tu cuenta ha sido bloqueada temporalmente ya que tus actividades
                        y/o información pueden que esté en contra de nuestros términos de uso
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        component={LinkBehavior}
                        to='/account/unlock'
                    >
                        Solicitar desbloqueo
                    </Button>
                </Stack>
            </Box>
        </InstagramModal>
    );
}

export default AccountLocked
