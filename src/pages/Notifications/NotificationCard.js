import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { ReactComponent as StandardIcon } from '../../assets/icons/Standard.svg'

const NotificationCard = ({ children }) => (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        margin: '1rem 0'
    }}>
        <Box>
            <StandardIcon />
        </Box>
        <Box sx={{
            color: theme => theme.palette.text.secondary,
            fontSize: '14px'
        }}>
            {children}
        </Box>
        <Box marginLeft='0.5rem'>
            <Button variant="outlined" sx={{
                fontSize: '14px',
                padding: '0.3rem 0.4rem',
            }}>
                Renovar
            </Button>
        </Box>
    </Box>
)

export default NotificationCard
