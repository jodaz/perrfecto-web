import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
// Icons
import { ReactComponent as PawIcon } from '../../../assets/icons/Paw.svg'

const LikeIconButton = ({ likes, ...rest }) => (
    <Badge
        badgeContent={`${likes}`}
        color="primary"
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
        sx={{
            '& .MuiBadge-badge': {
                height: '25px !important',
                width: '25px !important',
                borderRadius: '100px',
                color: '#fff',
                backgroundColor: theme => theme.palette.primary.main
            }
        }}
    >
        <IconButton sx={{
            background: '#fff',
            boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)'
        }} {...rest}>
            <PawIcon />
        </IconButton>
    </Badge>
);

export default LikeIconButton
