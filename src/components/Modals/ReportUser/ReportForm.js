import * as React from 'react';
import Button from '../../Button'
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Flag } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext'
import { reportUser } from '../../../utils/socket';

const ReportForm = ({ cancel, receptor, selectedItem, toggleNextStep, otherReason }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const { state: { user } } = useAuth()

    const submitReport = async () => {
        setIsLoading(true)
        try {
            let data = {
                "uid_reported": receptor.id,
                "id_reason": selectedItem.id,
                'uid': user.id
            };

            if (otherReason) {
                data.description = otherReason
            }

            const response = await reportUser(data)

            if (response) {
                setIsLoading(false)
                toggleNextStep('successful')
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    return (
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
        }}>
            <Box sx={{ p: 1, textAlign: 'center' }} color="text.secondary">
                <Flag size={40} />
            </Box>
            <Box sx={{ p: 1 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                    ¿Estás seguro que deseas reportar a este usuario?
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Tranquil@, "{receptor.name}" no lo sabrá
                </Typography>
            </Box>
            <Stack
                orientation='column'
                spacing={1}
            >
                <Button
                    color="error"
                    disabled={isLoading}
                    onClick={submitReport}
                >
                    Reportar usuario
                </Button>
                <MuiButton
                    disabled={isLoading}
                    sx={{ color: '#858585' }}
                    onClick={cancel}
                >
                    Cancelar
                </MuiButton>
            </Stack>
        </Box>
    );
}

export default ReportForm
