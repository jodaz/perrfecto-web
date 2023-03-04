import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar';
import getUserPhoto from '../../utils/getUserPhoto'
import Typography from '@mui/material/Typography';
import LinkBehavior from '../../components/LinkBehavior'

const newMessage = ({ name_sender }) => `Has recibido un nuevo mensaje de ${name_sender}.`

const NotificationCard = props => {
    const {
        id,
        img,
        type,
        link,
        name_sender,
        status,
        createdAt
    } = props

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'start',
            margin: '1rem 0'
        }} key={id}>
            <Box sx={{ mr: 1 }}>
                <Avatar src={getUserPhoto(img)} />
            </Box>
            <Box sx={{
                color: theme => theme.palette.text.secondary,
                fontSize: '14px',
                maxWidth: '150px'
            }}>
                <Typography
                    variant="subtitle1"
                    fontSize='14px'
                >
                    {(type == 'new_message') && newMessage(props)}
                </Typography>
            </Box>
            <Button variant="outlined" sx={{
                fontSize: '14px',
                padding: '0.3rem 0.4rem',
                width: 'fit-content',
                display: 'inline-flex',
                whitespace: 'nowrap'
            }} component={LinkBehavior} to={`/chat/${link}`}>
                Ver mensaje
            </Button>
        </Box>
    )
}

export default NotificationCard
