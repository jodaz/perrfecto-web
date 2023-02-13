import * as React from 'react';
import MUIIconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { MessageCircle } from 'lucide-react';
import { alpha } from '@mui/material';

const IconButton = props => (
    <MUIIconButton sx={{
        background: theme => theme.palette.primary.main,
        boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)',
        padding: '8px',
        '&:hover': {
            background: theme => `${alpha(theme.palette.primary.main, 0.9)}`
        }
    }} {...props}>
        <MessageCircle size={34} color="#fff" />
    </MUIIconButton>
)

const MessageIconButton = ({ active, ...rest }) => (
    active ? (
        <Badge
            badgeContent=''
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            sx={{
                '& .MuiBadge-badge': {
                    height: '16px',
                    width: '16px',
                    borderRadius: '100px',
                    border: '2px solid #fff'
                }
            }}
            color='success'
            variant="dot"
            overlap="circular"
        >
            <IconButton {...rest} />
        </Badge>
    ) : (
        <IconButton {...rest} />
    )
);

export default MessageIconButton
