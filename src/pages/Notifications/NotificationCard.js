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
        case 'refused_blog': {
            return `/blogs/${link}`;
        }
        case 'refused_business': {
            return `/businesses/${link}`;
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
        case 'like_reply_comment': {
            return `Tu respuesta ha recibido un like.`;
        }
        case 'refused_publication': {
            return `Tu anuncio ha sido rechazado.`;
        }
        case 'like_comment_blog': {
            return `Tu comentario ha recibido un like.`;
        }
        case 'refused_business': {
            return `Tu negocio ha sido rechazado.`;
        }
        case 'user_report': {
            return `Haz recibido un reporte de usuario.`;
        }
        case 'new_message': {
            return `Has recibido un nuevo mensaje de ${name_sender}.`;
        }
        case 'comment_blog': {
            return `Tu publicación ha recibido un comentario.`;
        }
        case 'refused_blog': {
            return `Tu ha sido rechazado.`;
        }
        default: {
            console.log("Unhandled type ", type)
            return ''
        }
    }
}

const createNotificationPhoto = ({ img, type }) => {
    switch(type) {
        case 'like_blog': {
            return null ? getUserPhoto(img) : '/images/Avatar.svg' ;
        }
        case 'user_report': {
            return '/images/default/Standard.png';
        }
        case 'new_message': {
            return null ? getUserPhoto(img) : '/images/Avatar.svg' ;
        }
        case 'comment_blog': {
            return null ? getUserPhoto(img) : '/images/Avatar.svg' ;
        }
        default: {
            console.log("Unhandled type ", type)
            return ''
        }
    }
}

const NotificationCard = props => {
    const { id } = props
    const typesWithoutButton = [
        'like_comment_blog',
        'user_report',
        'like_reply_comment',
        'refused_publication'
    ];

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'start',
            margin: '1rem 0'
        }} key={id}>
            <Box sx={{ mr: 1 }}>
                <Avatar src={createNotificationPhoto(props)} />
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
            {!typesWithoutButton.includes(props.type) && (
                <Button variant="outlined" sx={{
                    fontSize: '14px',
                    padding: '0.3rem 0.4rem',
                    width: 'fit-content',
                    display: 'inline-flex',
                    whitespace: 'nowrap'
                }} component={LinkBehavior} to={getLinkByType(props)}>
                    Ver
                </Button>
            )}
        </Box>
    )
}

export default NotificationCard
