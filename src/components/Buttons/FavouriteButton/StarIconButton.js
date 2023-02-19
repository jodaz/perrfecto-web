import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// Icons
import { ReactComponent as StarIcon } from '../../../assets/icons/Star.svg'
import { alpha } from '@mui/material';

const StarIconButton = props => (
    <Tooltip
        title='Guardar'
        placement='top'
    >
        <IconButton sx={{
            background: '#fff',
            boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)',
            '&:hover': {
                background: `${alpha('#fff', 0.9)}`
            }
        }} {...props}>
            <StarIcon />
        </IconButton>
    </Tooltip>
);

export default StarIconButton
