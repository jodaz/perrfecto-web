import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { apiProvider } from '../../../api';
import { Flag } from 'lucide-react';
import useEffectOne from '../../../utils/useEffectOnce'
import { alpha } from '@mui/material';
import { List, ListItemButton, ListItemText } from '@mui/material';

const ListReasons = ({ item, toggleNextStep, setSelectedItem }) => {
    const [reasons, setReasons] = React.useState([])

    const handleClick = reason => {
        setSelectedItem(reason)

        if (reason.name == 'Otro Motivo') {
            toggleNextStep('otherReason')
        } else {
            toggleNextStep('reportUser')
        }
    }

    const fetchReasons = async () => {
        try {
            const res = await apiProvider.get('/api/report-reason/all')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res

                setReasons(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffectOne(() => { fetchReasons() }, [])

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
                <List>
                    {reasons.map(item => (
                        <ListItemButton
                            key={item.id}
                            sx={{
                                borderRadius: '6px',
                                '&:hover': {
                                    backgroundColor: theme => `${alpha(theme.palette.divider, 0.7)}`
                                }
                            }}
                            onClick={() => handleClick(item)}
                        >
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Box>
    );
}

export default ListReasons
