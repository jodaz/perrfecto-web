import * as React from 'react';
import { IconButton, alpha } from '@mui/material';
import { Trash2 } from 'lucide-react';

const TrashButton = props => (
    <IconButton
        sx={{
            bgcolor: theme => theme.palette.error.main ,
            '&:hover': {
                bgcolor: theme => `${alpha(theme.palette.error.main, 0.9)}`
            }
        }}
        {...props}
    >
        <Trash2 color="#fff" size={14} />
    </IconButton>
);

export default TrashButton
