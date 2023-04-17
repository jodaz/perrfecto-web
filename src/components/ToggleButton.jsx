import * as React from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import { styled, alpha } from '@mui/material/styles';

const StyledMuiToggleButton = styled(MuiToggleButton)(({ theme }) => ({
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: '0 !important',
    borderRadius: '100px',
    textTransform: 'unset',
    fontWeight: 500,
    lineHeight: '24px',
    fontSize: '1rem',
    borderBottomLeftRadius: '100px !important',
    borderTopLeftRadius: '100px !important',
    borderBottomRightRadius: '100px !important',
    borderTopRightRadius: '100px !important',
    transition: '0.15s',
    '&[aria-pressed="true"]': {
        boxShadow: '0px 2px 12px rgba(161, 103, 201, 0.36)',
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: `${alpha(theme.palette.primary.main, 0.9)}`,
        }
    },
}));

const ToggleButton = ({ children, currentPath, value, ...restProps }) => (
    <StyledMuiToggleButton
        selected={currentPath == value}
        value={value}
        {...restProps}
    >
        {children}
    </StyledMuiToggleButton>
);

export default ToggleButton
