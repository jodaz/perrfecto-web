import * as React from 'react';
import PropTypes from 'prop-types';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { X } from 'lucide-react'

const DialogTitle = ({ children, onClose, ...other }) => (
    <MuiDialogTitle sx={{ m: 1, p: 1, border: 'none !important', display: 'flex' }} {...other}>
        {children}
        {onClose ? (
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <X color="#5E5E5E"  />
            </IconButton>
        ) : null}
    </MuiDialogTitle>
);

DialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default DialogTitle;
