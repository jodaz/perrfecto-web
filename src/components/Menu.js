import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MoreHorizontal } from 'lucide-react';

const ITEM_HEIGHT = 48;

const Menu = ({ children, icon, IconButtonProps, iconColor = '#000' }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                {...IconButtonProps}
            >
                {React.cloneElement(icon, {
                    color: iconColor
                })}
            </IconButton>
            <MuiMenu
                hideBackdrop
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '.MuiMenu-paper': {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.24)',
                        borderRadius: '8px',
                        width: 'fit-content',
                        padding: '0 !important'
                    }
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {React.Children.map(children, child => (
                    <MenuItem
                        key={child}
                        onClick={handleClose}
                        sx={{ width: '100%' }}
                    >
                        {React.cloneElement(child)}
                    </MenuItem>
                ))}
            </MuiMenu>
        </div>
    );
}

Menu.defaultProps = {
    icon: <MoreHorizontal />
}

export default Menu;
