import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CustomButton = ({
    icon,
    title,
    color,
    size,
    p = 2,
    sx,
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
        <Button
            variant="contained"
            color={color}
            sx={{
                borderRadius: '24px',
                height: '4rem',
                width: '4rem',
                padding: 0,
                boxShadow: '0px 2px 12px rgba(161, 103, 201, 0.36)',
                ...sx
            }}
        >
            {React.cloneElement(icon, {
                size: 32
            })}
        </Button>
        <Typography
            variant="subtitle1"
            sx={{
                textTransform: 'uppercase',
                marginTop: '1rem'
            }}
            color="text.tertiary"
            fontWeight={500}
            fontSize='12px'
            textAlign='center'
        >
            {title}
        </Typography>
    </Box>
);

export default CustomButton
