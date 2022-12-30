import * as React from 'react'
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

const CustomBadge = ({ children, count}) => (
    <Badge
        badgeContent={`${count}`}
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
                backgroundColor: theme => theme.palette.warning.main
            }
        }}
    >
        {children}
    </Badge>
)

const ButtonBadge = ({ children, total, ...buttonProps }) => (
    <CustomBadge count={`${total}`}>
        <Button
            variant="contained"
            sx={{
                padding: '8px, 16px, 8px, 16px',
                fontSize: '14px'
            }}
            {...buttonProps}
        >
            {children}
        </Button>
    </CustomBadge>
)

ButtonBadge.defaultProps = {
    total: 0
}

export default ButtonBadge
