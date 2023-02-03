import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { alpha } from '@mui/material';

const CustomIconButton = ({ component, to, sx, icon, size, color = "primary" }) => (
    <IconButton
        component={component}
        to={to}
        variant="contained"
        color="secondary"
        sx={{
            borderRadius: '24px',
            height: '4rem',
            width: '4rem',
            padding: 0,
            backgroundColor: theme => theme.palette[color].main,
            boxShadow: '0px 2px 12px rgba(161, 103, 201, 0.36)',
            '&:hover': {
                backgroundColor: theme => `${alpha(theme.palette[color].main, 0.8)}`
            },
            ...sx
        }}
    >
        {React.cloneElement(icon, {
            size: size
        })}
    </IconButton>
)

const CustomButton = ({
    title,
    p = 1,
    notify = false,
    ...rest
}) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'fit-content',
        width: 'fit-content',
        p: p
    }}>
        {(notify) ? (
            <Badge color="error" badgeContent="" overlap="circular">
                <CustomIconButton {...rest} />
            </Badge>
        ) : <CustomIconButton {...rest} />}
        <Typography
            variant="subtitle1"
            sx={{
                textTransform: 'uppercase',
                marginTop: '1rem'
            }}
            color="text.tertiary"
            fontWeight={400}
            fontSize='12px'
            textAlign='center'
        >
            {title}
        </Typography>
    </Box>
);

export default CustomButton
