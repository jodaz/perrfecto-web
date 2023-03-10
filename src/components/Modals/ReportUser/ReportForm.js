import * as React from 'react';
import Button from '../../Button'
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { apiProvider } from '../../../api';
import { Flag } from 'lucide-react';

const ReportForm = ({ item, selectedItem, toggleNextStep, otherReason }) => {
    const [isLoading, setIsLoading] = React.useState(false)

    const submitReport = async () => {
        setIsLoading(true)
        try {
            let data = {
                "uid_reported": item.receptor.user.id,
                "id_reason": selectedItem.id,
            };

            if (otherReason) {
                data.description = otherReason
            }

            const res = await apiProvider.post('/api/report-user/new', data)

            if (res.status >= 200 && res.status < 300) {
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
                    Tranquil@, "{item.receptor.user.name}" no lo sabrá
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
