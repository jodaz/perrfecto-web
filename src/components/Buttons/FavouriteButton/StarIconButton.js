import * as React from 'react';
import IconButton from '@mui/material/IconButton';
// Icons
import { ReactComponent as StarIcon } from '../../../assets/icons/Star.svg'

const StarIconButton = props => (
    <IconButton sx={{
        background: '#fff',
        boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)'
    }} {...props}>
        <StarIcon />
    </IconButton>
);

export default StarIconButton
