import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as HuesitoIcon } from '../../../assets/icons/Huesito.svg'

const DiscardIconButton = props => (
    <Tooltip
        title='Descartar'
        placement='top'
    >
        <IconButton sx={{
            background: 'url(/images/default/pasto_feo.png)',
            padding: '0.6rem',
            boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)',
            '&:hover': {
                opacity: 0.95
            }
        }} {...props}>
            <HuesitoIcon />
        </IconButton>
    </Tooltip>
);

export default DiscardIconButton
