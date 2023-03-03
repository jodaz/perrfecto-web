import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

const newMessage = ({ name_sender }) => `Has recibido un nuevo mensaje de ${name_sender}.`

const NotificationCard = props => {
    console.log(props)
    const {
        id,
        img,
        key,
        link,
        name_sender,
        status,
        createdAt
    } = props

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '1rem 0'
        }} key={id}>
            <Box>
            </Box>
            <Box sx={{
                color: theme => theme.palette.text.secondary,
                fontSize: '14px'
            }}>
                {(key == 'new_message') && newMessage(props)}
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
}

export default NotificationCard
