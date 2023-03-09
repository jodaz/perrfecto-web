import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar';
import getUserPhoto from '../../utils/getUserPhoto'
import Typography from '@mui/material/Typography';
import LinkBehavior from '../../components/LinkBehavior'

const getLinkByType = ({ type, link }) => {
    switch(type) {
        case 'like_blog': {
            return `/blogs/${link}`;
        }
        case 'new_message': {
            return `/chat/${link}`;
        }
        case 'comment_blog': {
            return `/blogs/${link}`;
        }
        default: {
            console.log("Unhandled type ", type)
            return `/${type}/${link}`
        }
    }
}

const getMessageByType = ({ name_sender, type }) => {
    switch(type) {
        case 'like_blog': {
            return `Tu publicación ha recibido un like.`;
        }
        case 'new_message': {
            return `Has recibido un nuevo mensaje de ${name_sender}.`;
        }
        case 'comment_blog': {
            return `Tu publicación ha recibido un comentario.`;
        }
        default: {
            console.log("Unhandled type ", type)
            return ''
        }
    }
}

const NotificationCard = props => {
    const {
        id,
        img
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
                width: '100%'
            }}>
                <Typography
                    variant="subtitle1"
                    fontSize='14px'
                >
                    {getMessageByType(props)}
                </Typography>
            </Box>
            <Button variant="outlined" sx={{
                fontSize: '14px',
                padding: '0.3rem 0.4rem',
                width: 'fit-content',
                display: 'inline-flex',
                whitespace: 'nowrap'
            }} component={LinkBehavior} to={getLinkByType(props)}>
                Ver
            </Button>
        </Box>
    )
}

export default NotificationCard
