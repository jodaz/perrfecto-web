import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
// Icons
import { ReactComponent as PawIcon } from '../../../assets/icons/Paw.svg'
import { alpha } from '@mui/material';

const LikeIconButton = ({ likes, ...rest }) => (
    <Tooltip
        title='Dar like'
        placement='top'
    >
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
            overlap="circular"
        >
            <IconButton sx={{
                background: '#fff',
                boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)',
                '&:hover': {
                    background: `${alpha('#fff', 0.9)}`
                }
            }} {...rest}>
                <PawIcon />
            </IconButton>
        </Badge>
    </Tooltip>
);

export default LikeIconButton
